import { Result } from "@fering-org/functional-helper"
import { parse } from "yaml"

import { type BoilerId, type BoilerUrl } from "./boiler"

export type BoilerPath = string

export namespace BoilerPath {
  export function toUrl(path: BoilerPath): BoilerUrl {
    return `./boilers/${path}`
  }
}

export type BoilersIndexItem = {
  id: BoilerId
  path: BoilerPath
}

export type BoilersIndex = BoilersIndexItem[]

export namespace BoilersIndex {
  export function fromYaml(yaml: string): Result<BoilersIndex, string> {
    try {
      return Result.mkOk(parse(yaml))
    } catch (error) {
      return Result.mkError((error as Error).message)
    }
  }

  export function getUrl(index: BoilersIndex, id: BoilerId) {
    const item = index.find(x => x.id === id)
    if (item === undefined)
      return
    return BoilerPath.toUrl(item.path)
  }
}
