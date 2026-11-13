<script lang="ts">
  import { type Option } from "@fering-org/functional-helper"

  import H1 from "../../../components/Content/H1.svelte"
  import H2 from "../../../components/Content/H2.svelte"
  import Markdown from "../../../components/Markdown/Index.svelte"
  import {
    type Boiler,
    type FrameSide,
    type Size,
    type Tube,
    type Value,
    type ValueNote,
  } from "../../../lib/boiler"
  import { concat } from "../../../lib/utils"

  export let boiler: Boiler

  type Row = {
    label: string
    value: string
    note: string
  }

  const frameSideLabel: Record<FrameSide, string> = {
    front: "передняя",
    left: "левая",
    right: "правая",
    back: "задняя",
  }

  function formatValue<T>(value: Value<T>): string {
    switch (value.case) {
      case "known":
        return String(value.fields)
      case "unknown":
        return "неизвестно"
      case "undefined":
        return "не указано"
    }
  }

  function withUnit(value: string | number, unit: string): string {
    return `${value}${unit === "" ? "" : ` ${unit}`}`
  }

  function valueNoteRow<T>(label: string, valueNote: ValueNote<T>, unit = ""): Row {
    return {
      label,
      value: valueNote.value.case === "known"
        ? withUnit(String(valueNote.value.fields), unit)
        : formatValue(valueNote.value),
      note: valueNote.note,
    }
  }

  function optionRow(label: string, option: Option<number>, unit = ""): Row {
    return {
      label,
      value: option === undefined ? "не указано" : withUnit(option, unit),
      note: "",
    }
  }

  function sizeRows(size: Size): Row[] {
    return [
      valueNoteRow("Высота", size.height, "мм"),
      optionRow("Ширина", size.width, "мм"),
      optionRow("Длина", size.length, "мм"),
    ]
  }

  function tubeRows(tube: Tube): Row[] {
    return [
      { label: "Диаметр", value: withUnit(tube.diameter, "мм"), note: "" },
      { label: "Сторона", value: frameSideLabel[tube.placed], note: "" },
      {
        label: "Расстояние до пола",
        value: withUnit(tube.position.floor, "мм"),
        note: "",
      },
      {
        label: "Расстояние до левой стенки корпуса",
        value: tube.position.left === "center"
          ? "по центру"
          : withUnit(tube.position.left, "мм"),
        note: "",
      },
    ]
  }

  $: sections = [
    { title: "Корпус", rows: sizeRows(boiler.frame) },
    { title: "Ножки", rows: sizeRows(boiler.leg) },
    { title: "Загрузочная камера", rows: sizeRows(boiler.chamber) },
    { title: "Дымоход", rows: tubeRows(boiler.chimney) },
    { title: "Патрубок вывода воды", rows: tubeRows(boiler.waterOutlet) },
  ]
</script>

<article class={concat([
  "space-y-6",
])}>
  <header class={concat([
    "space-y-2",
  ])}>
    {#if boiler.name.value.case === "known"}
      <H1>{boiler.name.value.fields}</H1>
    {:else}
      <H1>Котёл</H1>
    {/if}

    {#if boiler.name.note}
      <div class={concat([
        "text-gray-600",
        "dark:text-gray-300",
      ])}>
        <Markdown content={boiler.name.note} />
      </div>
    {/if}

    <p>
      Мощность: <span class={concat([
        "font-medium",
      ])}>{boiler.power} кВт</span>
    </p>
  </header>

  {#each sections as { title, rows }}
    <section class={concat([
      "space-y-2",
    ])}>
      <H2>{title}</H2>

      <table class={concat([
        "w-full",
        "border-collapse",
        "text-left",
      ])}>
        <tbody>
          {#each rows as row}
            <tr class={concat([
              "border-b",
              "border-gray-300",
              "dark:border-gray-600",
              "last:border-b-0",
            ])}>
              <th
                scope="row"
                class={concat([
                  "py-1",
                  "pr-4",
                  "align-top",
                  "font-normal",
                  "text-gray-600",
                  "dark:text-gray-300",
                ])}
              >
                {row.label}
              </th>
              <td class={concat([
                "py-1",
              ])}>
                {row.value}
                {#if row.note}
                  <div class={concat([
                    "text-sm",
                    "text-gray-600",
                    "dark:text-gray-300",
                  ])}>
                    <Markdown content={row.note} />
                  </div>
                {/if}
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </section>
  {/each}
</article>
