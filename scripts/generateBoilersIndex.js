// @ts-check

import path from "node:path"
import { stringify } from "yaml"
import fs from "node:fs"

const rootDir = path.resolve(process.argv[2] || "./public/boilers");
const outputFile = path.resolve(process.argv[3] || "./public/boilers/index.yaml");

/**
 * Собирает YAML-файлы в корневой папке и по одному YAML-файлу
 * из каждой непосредственной подпапки.
 *
 * @param {string} root Путь к корневой папке.
 * @returns {Array<[string, string]>} Пары [имя, относительный путь].
 */
function collect(root) {
  const rootFullPath = path.resolve(root);

  /**
   * @param {string} extension
   */
  const isYaml = (extension) =>
    extension === ".yml" || extension === ".yaml";

  /**
   * @param {string} absolutePath
   * @returns {string}
   */
  const relativeToRoot = (absolutePath) =>
    path.relative(rootFullPath, absolutePath);

  /** @type {[string, string][]} */
  const result = [];

  /**
   * @param {fs.Dirent<string>} entry
   */
  function fileHandle(entry) {
    const extension = path.extname(entry.name);
    if (!isYaml(extension)) return;

    const nameWithoutExtension = path.basename(entry.name, extension);
    if (nameWithoutExtension === "index") return;

    const absolutePath = path.join(rootFullPath, entry.name);
    result.push([nameWithoutExtension, relativeToRoot(absolutePath)]);
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
      result.push([entry.name, relativeToRoot(yamlPath)])
    }
  }

  const entries = fs.readdirSync(rootFullPath, { withFileTypes: true });

  for (const entry of entries) {
    if (entry.isDirectory()) {
      dirHandle(entry)
    }
    if (entry.isFile()) {
      fileHandle(entry)
    }
  }

  return result
}

function main() {
    const result = new Map(collect(rootDir))
    fs.writeFile(outputFile, stringify(result), { encoding: "utf-8" }, () => {
      console.log(`Создан файл: ${outputFile}`);
    });
}

try {
  main()
} catch (error) {
  console.error(error);
  process.exitCode = 1;
}
