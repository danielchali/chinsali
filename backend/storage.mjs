import { createCipheriv, createDecipheriv, randomBytes } from "node:crypto";
import { appendFile, mkdir } from "node:fs/promises";
import { createReadStream } from "node:fs";
import { createInterface } from "node:readline";
import { dirname } from "node:path";

export function encryptionKeyFromBase64(value) {
  if (!value) return null;
  const key = Buffer.from(value, "base64");
  if (key.length !== 32 || key.toString("base64") !== value) {
    throw new Error("SUBMISSION_ENCRYPTION_KEY must be a base64-encoded 32-byte key.");
  }
  return key;
}

export class EncryptedSubmissionStore {
  #writeQueue = Promise.resolve();

  constructor(filePath, key) {
    if (!Buffer.isBuffer(key) || key.length !== 32) {
      throw new Error("A 32-byte encryption key is required for resident submissions.");
    }
    this.filePath = filePath;
    this.key = key;
  }

  async listRecent({ kind, limit = 50 } = {}) {
    if (!Number.isInteger(limit) || limit < 1 || limit > 100) {
      throw new Error("Submission list limit must be between 1 and 100.");
    }
    if (kind && !["issue", "other"].includes(kind)) {
      throw new Error("Unknown submission filter.");
    }

    const records = [];
    let total = 0;
    try {
      const lines = createInterface({ input: createReadStream(this.filePath, { encoding: "utf8" }), crlfDelay: Infinity });
      for await (const line of lines) {
        if (!line.trim()) continue;
        const envelope = JSON.parse(line);
        const record = this.#decrypt(envelope);
        const submissionKind = record?.submission?.kind;
        if (kind === "issue" && submissionKind !== "issue") continue;
        if (kind === "other" && submissionKind === "issue") continue;
        total += 1;
        records.push(record);
        if (records.length > limit) records.shift();
      }
    } catch (error) {
      if (error?.code === "ENOENT") return { items: [], total: 0 };
      throw new Error("Encrypted submission records could not be read.", { cause: error });
    }
    return { items: records.reverse(), total };
  }

  #decrypt(envelope) {
    if (!envelope || envelope.version !== 1) {
      throw new Error("Invalid encrypted submission record.");
    }
    const iv = Buffer.from(envelope.iv, "base64");
    const tag = Buffer.from(envelope.tag, "base64");
    const ciphertext = Buffer.from(envelope.ciphertext, "base64");
    if (iv.length !== 12 || tag.length !== 16 || !ciphertext.length) {
      throw new Error("Invalid encrypted submission record.");
    }
    const decipher = createDecipheriv("aes-256-gcm", this.key, iv);
    decipher.setAuthTag(tag);
    const plaintext = Buffer.concat([decipher.update(ciphertext), decipher.final()]);
    const record = JSON.parse(plaintext.toString("utf8"));
    if (!record || typeof record.reference !== "string" || typeof record.receivedAt !== "string" || !record.submission || typeof record.submission !== "object") {
      throw new Error("Invalid decrypted submission record.");
    }
    return record;
  }

  save(record) {
    const operation = this.#writeQueue.then(async () => {
      const iv = randomBytes(12);
      const cipher = createCipheriv("aes-256-gcm", this.key, iv);
      const ciphertext = Buffer.concat([
        cipher.update(JSON.stringify(record), "utf8"),
        cipher.final(),
      ]);
      const envelope = JSON.stringify({
        version: 1,
        iv: iv.toString("base64"),
        tag: cipher.getAuthTag().toString("base64"),
        ciphertext: ciphertext.toString("base64"),
      });

      await mkdir(dirname(this.filePath), { recursive: true });
      await appendFile(this.filePath, `${envelope}\n`, { encoding: "utf8", mode: 0o600 });
    });

    this.#writeQueue = operation.catch(() => {});
    return operation;
  }
}
