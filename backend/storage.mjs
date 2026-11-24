import { createCipheriv, randomBytes } from "node:crypto";
import { appendFile, mkdir } from "node:fs/promises";
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
