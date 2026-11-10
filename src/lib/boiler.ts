import { Result } from "@fering-org/functional-helper"

export type BoilerId = string

export type Boiler = {
  name: string
  height: number
  width: number
  depth: number
}

export namespace Boiler {
  export function fromJson(json: string): Result<Boiler, string> {
    try {
      return Result.mkOk(JSON.parse(json))
    } catch (error) {
      return Result.mkError((error as Error).message)
    }
  }
}

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
