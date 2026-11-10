import { Result } from "@fering-org/functional-helper"
import { parse } from "yaml"

import { type BoilerUrl } from "./boiler"

export type BoilersIndex = BoilerUrl[]

export namespace BoilersIndex {
  export function fromYaml(yaml: string): Result<BoilersIndex, string> {
    try {
      return Result.mkOk(parse(yaml))
    } catch (error) {
      return Result.mkError((error as Error).message)
    }
  }
}
