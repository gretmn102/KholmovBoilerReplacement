import { Option, Result, UnionCase } from "@fering-org/functional-helper"
import { parse, stringify } from "yaml"

// refactor: use [feat(UnionCase): add `is` function](https://github.com/gretmn102/functional-helper/issues/15)
export namespace UnionCaseExt {
  export function is<Name, Value = undefined>(value: unknown): value is UnionCase<Name, Value> {
    if (typeof value !== "object" || value === null) return false

    const keys = Reflect.ownKeys(value)
    return (
      keys.length === 2 &&
      keys.includes("case" as const satisfies keyof UnionCase<Name, Value>) &&
      keys.includes("fields" as const satisfies keyof UnionCase<Name, Value>)
    )
  }
}

export type BoilerId = string
export type BoilerUrl = string

export type Value<T> =
  | UnionCase<"known", T>
  | UnionCase<"unknown">
  | UnionCase<"undefined">

export namespace Value {
  export function create<T>(known: T): Value<T> {
    return UnionCase.mkUnionCase("known", known)
  }
  export function createUnknown<T>(): Value<T> {
    return UnionCase.mkEmptyUnionCase("unknown")
  }
  export function createUndefined<T>(): Value<T> {
    return UnionCase.mkEmptyUnionCase("undefined")
  }
}

export type ValueNote<T> = {
  value: Value<T>
  note: string
}

export namespace ValueNote {
  export function create<T>(value: T, note = ""): ValueNote<T> {
    return {
      value: Value.create(value),
      note,
    }
  }

  export function createUnknown<T>(note = ""): ValueNote<T> {
    return {
      value: Value.createUnknown(),
      note,
    }
  }

  export function createUndefined<T>(note = ""): ValueNote<T> {
    return {
      value: Value.createUndefined(),
      note,
    }
  }
}

export type Size = {
  height: ValueNote<number>
  width: Option<number>
  length: Option<number>
}

export type FrameSide = "front" | "left" | "right" | "back"

export type Tube = {
  diameter: number
  placed: FrameSide
  // /** расстояние от центра патрубка к чему-то */
  position: {
    /** к низу пола */
    floor: number
    /** к левой стенке корпуса */
    left: number | "center"
  }
}

/** английские названия характеристик брал с https://www.ter-en.com/en/konstruktsiya/ktt */
export type Boiler = {
  name: ValueNote<string>
  /** Мощность в кВт */
  power: number
  /** Корпус */
  frame: Size
  /** Ножки */
  leg: Size
  /** Загрузочная камера */
  chamber: Size
  /** Дымоход */
  chimney: Tube
  /** Патрубок вывода воды */
  waterOutlet: Tube
  /** Патрубок подачи воды */
  waterInlet: Tube
}

export namespace Boiler {
  export function fromYaml(yaml: string): Result<Boiler, string> {
    try {
      return Result.mkOk(parse(yaml))
    } catch (error) {
      return Result.mkError((error as Error).message)
    }
  }

  export function toYaml(boiler: Boiler): string {
    return stringify(boiler)
  }
}
