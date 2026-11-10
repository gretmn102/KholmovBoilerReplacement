// @ts-check

import { readdir, writeFile } from "node:fs/promises"
import { resolve, relative, sep, join, basename, extname } from "node:path"
import { stringify } from "yaml"
import fs from "node:fs"
import path from "node:path"

/**
 * @typedef {Record<string, string>} Catalog
 */

const rootDir = resolve(process.argv[2] || "./public/boilers");
const outputFile = resolve(process.argv[3] || "./public/boilers/index.yaml");

/**
 * Рекурсивно собирает YAML-файлы корня и индексные файлы подпапок.
 *
 * @param {string} dir Путь к текущей папке.
 * @param {Catalog} result Собираемый каталог: ключ — имя, значение — относительный путь.
 * @param {boolean} [isRoot=false] Указывает, является ли папка корневой.
 * @returns {Promise<void>}
 */
async function collect(dir, result, isRoot = false) {
  const entries = await readdir(dir, { withFileTypes: true });

  const files = new Set(
    entries
      .filter((entry) => entry.isFile())
      .map((entry) => entry.name)
  );

  if (!isRoot) {
    const entryFile = [
      "index.yml",
      "index.yaml",
    ].find((name) => files.has(name));

    if (entryFile) {
      const key = relative(rootDir, dir).split(sep).join("/");
      const value = relative(rootDir, join(dir, entryFile))
        .split(sep)
        .join("/");

      result[key] = value;
    }
  }

  for (const entry of entries) {
    const fullPath = join(dir, entry.name);

    if (entry.isDirectory()) {
      await collect(fullPath, result);
    } else if (
      isRoot &&
      entry.isFile() &&
      /\.(yml|yaml)$/i.test(entry.name)
    ) {
      const key = basename(entry.name, extname(entry.name));
      const value = relative(rootDir, fullPath).split(sep).join("/");

      result[key] = value;
    }
  }
}

/**
 * Собирает YAML-файлы в корневой папке и по одному YAML-файлу
 * из каждой непосредственной подпапки.
 *
 * @param {string} root Путь к корневой папке.
 * @returns {Array<[string, string]>} Пары [имя, относительный путь].
 */
function collect2(root) {
  const rootFullPath = path.resolve(root);

  /**
   * @param {string} extension
   * @returns {boolean}
   */
  const isYaml = (extension) =>
    extension === ".yml" || extension === ".yaml";

  /**
   * @param {string} absolutePath
   * @returns {string}
   */
  const relativeToRoot = (absolutePath) =>
    path.relative(rootFullPath, absolutePath);

  /**
   * @param {fs.Dirent<string>} entry
   */
  function fileHandle(entry) {
    const extension = path.extname(entry.name);
    if (!isYaml(extension)) return;

    const nameWithoutExtension = path.basename(entry.name, extension);
    if (nameWithoutExtension === "index") return;

    const absolutePath = path.join(rootFullPath, entry.name);
    files.push([nameWithoutExtension, relativeToRoot(absolutePath)]);
  }

  /**
   * @param {fs.Dirent<string>} entry
   */
  function dirHandle(entry) {
    const dirPath = path.join(rootFullPath, entry.name)
    const childEntries = fs.readdirSync(dirPath, { withFileTypes: true })

    const firstYaml = childEntries.find(
      (child) => child.isFile() && isYaml(path.extname(child.name))
    )

    if (firstYaml) {
      const yamlPath = path.join(dirPath, firstYaml.name)
      dirs.push([entry.name, relativeToRoot(yamlPath)])
    }
  }

  const entries = fs.readdirSync(rootFullPath, { withFileTypes: true });

  /** @type {[string, string][]} */
  const dirs = [];

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    dirHandle(entry)
  }

  /** @type {[string, string][]} */
  const files = [];

  for (const entry of entries) {
    if (!entry.isFile()) continue;
    fileHandle(entry)
  }

  return [...dirs, ...files];
}


/**
 * Собирает каталог и записывает его в YAML-файл.
 *
 * @returns {Promise<void>}
 */
async function main() {
  const result = collect2(rootDir)


  await writeFile(outputFile, stringify(result), "utf8");
  console.log(`Создан файл: ${outputFile}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
