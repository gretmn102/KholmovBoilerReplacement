import { Boiler } from "../src/lib/boiler"
import fs from "node:fs"

const boilerYaml = fs
  .readFileSync("public/boilers/boiler1.yaml")
  .toString()

console.log(
  JSON.stringify(
    Boiler.fromYaml(boilerYaml), undefined, 2
  )
)
