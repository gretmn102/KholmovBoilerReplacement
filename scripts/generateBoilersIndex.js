// @ts-check

import { readdir, writeFile } from "node:fs/promises"
import { resolve, relative, sep, join, basename, extname } from "node:path"
import { stringify } from "yaml"

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
      "just-index.yml",
      "just-index.yaml",
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
 * Собирает каталог и записывает его в YAML-файл.
 *
 * @returns {Promise<void>}
 */
async function main() {
  /** @type {Catalog} */
  const result = {};

  await collect(rootDir, result, true);

  /** @type {Catalog} */
  const sorted = Object.fromEntries(
    Object.entries(result).sort(([a], [b]) => a.localeCompare(b))
  );

  await writeFile(outputFile, stringify(sorted), "utf8");
  console.log(`Создан файл: ${outputFile}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
