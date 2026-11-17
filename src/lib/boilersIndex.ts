import { Result } from "@fering-org/functional-helper"
import { parse } from "yaml"

import { type BoilerId, type BoilerUrl } from "./boiler"

export type BoilerPath = string

export namespace BoilerPath {
  export function toUrl(path: BoilerPath): BoilerUrl {
    return `./boilers/${path}`
  }

  /** Разрешает путь к изображению относительно папки с файлом данных котла. */
  export function toImageUrl(dataPath: BoilerPath, image: string): BoilerUrl {
    const separatorIndex = dataPath.lastIndexOf("/")
    const directory = separatorIndex === -1 ? "" : dataPath.slice(0, separatorIndex)

    return toUrl(directory === "" ? image : `${directory}/${image}`)
  }
}

export type BoilersIndex = Map<BoilerId, BoilerPath>

export namespace BoilersIndex {
  export function fromYaml(yaml: string): Result<BoilersIndex, string> {
    try {
      return Result.mkOk(new Map<string, BoilerPath>(Object.entries(parse(yaml))))
    } catch (error) {
      return Result.mkError((error as Error).message)
    }
  }

  export function getPath(index: BoilersIndex, id: BoilerId) {
    const path = index.get(id)
    if (path === undefined)
      return
    return path
  }
}
