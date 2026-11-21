import fs from "node:fs"
import { Option } from "@fering-org/functional-helper"

import { Boiler, Value, ValueNote } from "../src/lib/boiler"

const myBoiler: Boiler = {
  dataPath: Option.mkNone(),
  name: {
    value: Value.create("Твердопаливний котел шахтного типу \"Холмова\" СТАНДАРТ"),
    note: "если верить [найденному котлу из магазина Hott](https://hott.com.ua/p1001742026-shahtnyj-kotel-holmova.html/)",
  },
  images: [
    { title: "Задняя, боковая, лицевая", path: "images/all.webp" },
    { title: "Лицевая сторона", path: "images/front.webp" },
    { title: "Правая сторона", path: "images/right.webp" },
    { title: "Задняя сторона", path: "images/back.webp" },
  ],
  sellers: [
    {
      name: "Hott",
      price: ValueNote.create(13300),
      url: ValueNote.create("https://hott.com.ua/p1001742026-shahtnyj-kotel-holmova.html/"),
      available: ValueNote.create(false, "Написал им на почту 07.10.2026 — не отвечают (12.10.2026)"),
    },
  ],
  power: 10,
  frame: {
    height: ValueNote.create(950),
    width: ValueNote.create(465),
    length: ValueNote.create(600),
  },
  leg: {
    height: ValueNote.create(40),
    width: ValueNote.createUndefined(),
    length: ValueNote.createUndefined(),
  },
  dimensions: {
    height: ValueNote.createUndefined(),
    width: ValueNote.createUndefined(),
    length: ValueNote.createUndefined(),
  },
  chamber: {
    height: ValueNote.createUnknown("Не знаю, докуда мерить. Возможно, до решетки."),
    width: ValueNote.create(400),
    length: ValueNote.create(400),
  },
  chimney: {
    diameter: ValueNote.create(160),
    placed: "back",
    position: {
      floor: ValueNote.create(855),
      left: "center",
    },
  },
  waterInlet: {
    diameter: ValueNote.create(59.62),
    placed: "right",
    position: {
      floor: ValueNote.create(95),
      left: ValueNote.create(75),
    }
  },
  waterOutlet: {
    diameter: ValueNote.create(59.62),
    placed: "back",
    position: {
      floor: ValueNote.create(925),
      left: ValueNote.create(400),
    }
  },
}

fs.writeFileSync(
  "public/boilers/my-boiler/index.yaml",
  Boiler.toYaml(myBoiler),
)

const heizerElite10: Boiler = {
  dataPath: Option.mkNone(),
  name: {
    value: Value.create("KesselHeizer Elite 10"),
    note: "[heizer-komforthause](https://termoplus.com.ua/production/heizer-komforthause/)",
  },
  images: [
    // todo: ![характеристики](./haizer.jpg)
  ],
  sellers: [
    {
      name: "Термоплюс",
      price: ValueNote.create(44990, "за 5мм толщины (в ЛС указано)"),
      url: ValueNote.create("https://termoplus.com.ua/production/heizer-komforthause/"),
      available: ValueNote.create(true),
    },
  ],
  power: 10,
  // todo: толщина стенок: 5 (доступны еще 4 и 6)
  dimensions: {
    height: ValueNote.create(950),
    width: ValueNote.create(520),
    length: ValueNote.create(640),
  },
  frame: {
    height: ValueNote.createUnknown(),
    width: ValueNote.createUnknown(),
    length: ValueNote.createUnknown(),
  },
  leg: {
    height: ValueNote.createUnknown(),
    width: ValueNote.createUndefined(),
    length: ValueNote.createUndefined(),
  },
  chamber: {
    height: ValueNote.create(740),
    width: ValueNote.create(360),
    length: ValueNote.create(380),
  },
  chimney: {
    diameter: ValueNote.create(160, "доступно еще 130"),
    placed: "back",
    position: {
      floor: ValueNote.create(800, "Написали в ЛС: «Зможемо зробити під замовлення потрібну висоту +1000 грн. чекати 3 тижні орієнтовно»"),
      left: "center",
    },
  },
  waterInlet: {
    diameter: ValueNote.create(40, "Взято из «диаметр патрубков соединений»"),
    placed: "right",
    position: {
      floor: ValueNote.createUnknown(),
      left: ValueNote.createUnknown(),
    }
  },
  waterOutlet: {
    diameter: ValueNote.create(40, "Взято из «диаметр патрубков соединений»"),
    placed: "back",
    position: {
      floor: ValueNote.createUnknown(),
      left: ValueNote.createUnknown(),
    }
  },
}

fs.writeFileSync(
  "public/boilers/heizer-elite-10.yaml",
  Boiler.toYaml(heizerElite10),
)

console.log("Done!")
