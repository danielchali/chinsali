import { randomUUID } from "node:crypto";
import { mkdir, readFile, rename, rm, writeFile } from "node:fs/promises";
import { basename, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const EMPTY_CONTENT = { news: [], gallery: [], polls: [] };
const COLLECTIONS = new Set(Object.keys(EMPTY_CONTENT));
const DEFAULT_FILE = resolve(dirname(fileURLToPath(import.meta.url)), "data/content.json");

export class LocalContentStore {
  #filePath;
  #uploadsPath;
  #pending = Promise.resolve();

  constructor(filePath = DEFAULT_FILE) {
    this.#filePath = resolve(filePath);
    this.#uploadsPath = resolve(dirname(this.#filePath), "uploads");
  }

  #enqueue(operation) {
    const result = this.#pending.then(operation);
    this.#pending = result.catch(() => {});
    return result;
  }

  async #read() {
    let text;
    try {
      text = await readFile(this.#filePath, "utf8");
    } catch (error) {
      if (error?.code === "ENOENT") return structuredClone(EMPTY_CONTENT);
      throw error;
    }

    let data;
    try {
      data = JSON.parse(text);
    } catch {
      throw new Error("The local content file is not valid JSON.");
    }
    if (!data || typeof data !== "object" || Object.keys(EMPTY_CONTENT).some(
      (key) => !Array.isArray(data[key]) || data[key].some((item) => !item || typeof item !== "object" || Array.isArray(item)),
    )) {
      throw new Error("The local content file has an invalid structure.");
    }
    return data;
  }

  async #write(data) {
    const directory = dirname(this.#filePath);
    await mkdir(directory, { recursive: true });
    const temporaryPath = resolve(directory, `.${basename(this.#filePath)}.${randomUUID()}.tmp`);
    try {
      await writeFile(temporaryPath, JSON.stringify(data, null, 2), { flag: "wx", mode: 0o600 });
      await rename(temporaryPath, this.#filePath);
    } catch (error) {
      await rm(temporaryPath, { force: true });
      throw error;
    }
  }

  list(collection) {
    if (!COLLECTIONS.has(collection)) throw new Error("Unknown content collection.");
    return this.#enqueue(async () => structuredClone((await this.#read())[collection]));
  }

  publicContent() {
    return this.#enqueue(async () => {
      const data = await this.#read();
      return {
        news: structuredClone(data.news.filter((item) => item.status === "published")),
        gallery: structuredClone(data.gallery.filter((item) => item.status === "published")),
      };
    });
  }

  overview() {
    return this.#enqueue(async () => {
      const data = await this.#read();
      return {
        news: data.news.length,
        publishedNews: data.news.filter((item) => item.status === "published").length,
        gallery: data.gallery.length,
        publishedGallery: data.gallery.filter((item) => item.status === "published").length,
        pollDrafts: data.polls.length,
      };
    });
  }

  create(collection, record) {
    if (!COLLECTIONS.has(collection)) throw new Error("Unknown content collection.");
    return this.#enqueue(async () => {
      const data = await this.#read();
      data[collection].unshift(record);
      await this.#write(data);
      return structuredClone(record);
    });
  }

  update(collection, id, record) {
    if (!COLLECTIONS.has(collection)) throw new Error("Unknown content collection.");
    return this.#enqueue(async () => {
      const data = await this.#read();
      const index = data[collection].findIndex((item) => item.id === id);
      if (index < 0) return null;
      data[collection][index] = record;
      await this.#write(data);
      return structuredClone(record);
    });
  }

  remove(collection, id) {
    if (!COLLECTIONS.has(collection)) throw new Error("Unknown content collection.");
    return this.#enqueue(async () => {
      const data = await this.#read();
      const index = data[collection].findIndex((item) => item.id === id);
      if (index < 0) return false;
      data[collection].splice(index, 1);
      await this.#write(data);
      return true;
    });
  }

  saveUpload(filename, buffer) {
    return this.#enqueue(async () => {
      await mkdir(this.#uploadsPath, { recursive: true });
      const path = resolve(this.#uploadsPath, filename);
      if (dirname(path) !== this.#uploadsPath) throw new Error("Invalid upload filename.");
      await writeFile(path, buffer, { flag: "wx", mode: 0o600 });
    });
  }

  readUpload(filename) {
    return this.#enqueue(async () => {
      if (!/^[\da-f-]{36}\.(?:jpg|png|webp)$/.test(filename)) return null;
      try {
        const path = resolve(this.#uploadsPath, filename);
        if (dirname(path) !== this.#uploadsPath) return null;
        return await readFile(path);
      } catch (error) {
        if (error?.code === "ENOENT") return null;
        throw error;
      }
    });
  }

  isPublishedImage(imagePath) {
    return this.#enqueue(async () => {
      const data = await this.#read();
      return ["news", "gallery"].some((collection) => data[collection].some(
        (item) => item.status === "published" && item.image === imagePath,
      ));
    });
  }

  deleteUnusedUpload(filename) {
    return this.#enqueue(async () => {
      if (!/^[\da-f-]{36}\.(?:jpg|png|webp)$/.test(filename)) return false;
      const data = await this.#read();
      const imagePath = `/api/media/${filename}`;
      const isUsed = ["news", "gallery"].some((collection) => data[collection].some((item) => item.image === imagePath));
      if (isUsed) return false;
      const path = resolve(this.#uploadsPath, filename);
      if (dirname(path) !== this.#uploadsPath) return false;
      try {
        await rm(path);
        return true;
      } catch (error) {
        if (error?.code === "ENOENT") return false;
        throw error;
      }
    });
  }
}
