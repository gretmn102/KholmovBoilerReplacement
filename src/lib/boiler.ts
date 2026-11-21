import { Result, UnionCase, type Option } from "@fering-org/functional-helper"
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
  width: ValueNote<number>
  length: ValueNote<number>
}

export type FrameSide = "front" | "left" | "right" | "back"

export type Tube = {
  diameter: ValueNote<number>
  placed: FrameSide
  // /** расстояние от центра патрубка к чему-то */
  position: {
    /** к низу пола */
    floor: ValueNote<number>
    /** к левой стенке корпуса */
    left: ValueNote<number> | "center"
  }
}

export type Seller = {
  name: string
  price: ValueNote<number>
  /** ссылка на карточку в онлайн-магазине (если такая есть) */
  url: ValueNote<string>
  available: ValueNote<boolean>
}

/** английские названия характеристик брал с https://www.ter-en.com/en/konstruktsiya/ktt */
export type Boiler = {
  /** Локальный путь к файлу с данными. Например:
   * * `my-boiler/index.yaml`
   * * `some-boiler.yaml`
   */
  dataPath: Option<string>
  name: ValueNote<string>
  /** Пути к изображениям задаются относительно `datePath`.
   *
   * Допустим, есть поле `dataPath` со значением `my-boiler/index.yaml`. В папке `my-boiler/images` есть файл `image.png`. В поле `images` он определен относительно — `images/image.png`. Абсолютный путь определяется так:
   *
   * 1. Вернуть папку из `my-boiler/index.yaml`, получится `my-boiler`
   * 2. `my-boiler` + `/` + `images/image.png`
   *
  */
  images: string[]
  sellers: Seller[]
  /** Мощность в кВт */
  power: number
  /** Корпус */
  frame: Size
  /** Ножки */
  leg: Size
  /** Загрузочная камера */
  chamber: Size
  /** Габаритные размеры указываются на всех котлах, но есть нюанс — неизвестно, что входит в эти размеры.
   *
   * Общее правило, говорят, такое: «Габаритный размер — это сумма всех выступающих частей». В действительности может быть вообще как попало.
   *
   * Размеры корпуса точно должны входить в габаритные размеры котла.
   *
   * * В высоту входит: высота корпуса, высота ножек (предполагается, что везде есть ножки), глубина верхней крышки (под вопросом), высота выступающей ручки верхней крышки (под очень большим вопросом)
   * * В ширину входит: ширина корпуса, глубина патрубков подачи воды (их бывает несколько по бокам или вообще ни одного)
   * * В глубину входит: глубина корпуса, глубина нижней крышки (под вопросом) + глубина выступающей ручки нижней крышки (под вопросом), длина дымохода (под вопросом) или длина патрубка воды (под вопросом) — учитывается самая длинная
  */
  dimensions: Size
  /** Дымоход */
  chimney: Tube
  /** Патрубок вывода воды */
  waterOutlet: Tube
  /** Патрубок подачи воды */
  waterInlet: Tube
}

export namespace Boiler {
  export function fromYaml(yaml: string, dataPath: Boiler["dataPath"]): Result<Boiler, string> {
    try {
      return Result.mkOk({ ...parse(yaml), dataPath })
    } catch (error) {
      return Result.mkError((error as Error).message)
    }
  }

  export function toYaml(boiler: Boiler): string {
    return stringify(boiler)
  }

  export function computeDimensions(boiler: Boiler): Size {
    function toComputed(valueNote: ValueNote<number>): ValueNote<number> {
      switch (valueNote.value.case) {
        case "known":
          return ValueNote.create(valueNote.value.fields)
        case "unknown":
          return ValueNote.createUnknown()
        case "undefined":
          return ValueNote.createUndefined()
      }
    }

    function add(a: ValueNote<number>, b: ValueNote<number>): ValueNote<number> {
      return a.value.case === "known" && b.value.case === "known"
        ? ValueNote.create(a.value.fields + b.value.fields)
        : ValueNote.createUnknown()
    }

    return {
      height: add(boiler.frame.height, boiler.leg.height),
      width: toComputed(boiler.frame.width),
      length: toComputed(boiler.frame.length),
    }
  }
}
