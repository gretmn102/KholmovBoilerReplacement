import { Boiler } from "../src/lib/boiler"
import fs from "node:fs"

const myBoiler: Boiler = {
  name: {
    value: "Титан-10",
    note: "если верить [найденному котлу из магазина Hott](https://hott.com.ua/p1001742026-shahtnyj-kotel-holmova.html/)",
  },
  power: 10,
  frame: {
    height: 950,
    width: 465,
    length: 600,
  },
  leg: {
    height: 40,
    width: undefined,
    length: undefined,
  },
  chamber: {
    height: -1,
    width: 400,
    length: 400,
  },
  chimney: {
    diameter: 160,
    placed: "back",
    position: {
      floor: 855,
      left: "center",
    },
  },
  waterOutlet: {
    diameter: 59.62,
    placed: "right",
    position: {
      floor: 95,
      left: 75
    }
  }
}

fs.writeFileSync(
  "public/boilers/my-boiler.yaml",
  Boiler.toYaml(myBoiler),
)
console.log("Done!")
