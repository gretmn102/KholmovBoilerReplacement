import { Result } from "@fering-org/functional-helper"
import { parse } from "yaml"

export type BoilerId = string

export type Boiler = {
  name: string
  height: number
  width: number
  depth: number
}

export namespace Boiler {
  export function fromYaml(yaml: string): Result<Boiler, string> {
    try {
      return Result.mkOk(parse(yaml))
    } catch (error) {
      return Result.mkError((error as Error).message)
    }
  }
}
