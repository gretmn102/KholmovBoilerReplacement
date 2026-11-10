import { Result } from "@fering-org/functional-helper"

import { type BoilerId } from "./boiler"

export type BoilersIndex = BoilerId[]

export namespace BoilersIndex {
  export function fromJson(json: string): Result<BoilersIndex, string> {
    try {
      return Result.mkOk(JSON.parse(json))
    } catch (error) {
      return Result.mkError((error as Error).message)
    }
  }
}
