import { Option, Result } from "@fering-org/functional-helper"
import { parse, stringify } from "yaml"

export type BoilerId = string
export type BoilerUrl = string

export type ValueNote = {
  value: string
  note: string
}

export type Size = {
  height: number
  width: Option<number>
  length: Option<number>
}

export type FrameSide = "front" | "left" | "right" | "back"

export type Tube = {
  diameter: number
  placed: FrameSide
  // /** расстояние от центра патрубка к чему-то */
  // position: {
  //   /** к низу пола */
  //   floor: number
  //   /** к левой стенке корпуса */
  //   left: number | "center"
  // }
}

/** английские названия характеристик брал с https://www.ter-en.com/en/konstruktsiya/ktt */
export type Boiler = {
  name: ValueNote
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
