<script lang="ts">
  import H1 from "../../../components/Content/H1.svelte"
  import H2 from "../../../components/Content/H2.svelte"
  import Table from "../../../components/Content/Table.svelte"
  import Markdown from "../../../components/Markdown/Index.svelte"
  import Carousel from "../../../components/Carousel.svelte"
  import {
    type Boiler,
    type FrameSide,
    type Size,
    type Tube,
    type Value,
    type ValueNote,
  } from "../../../lib/boiler"
  import { BoilerPath } from "../../../lib/boilersIndex"
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

  function sizeRows(size: Size): Row[] {
    return [
      valueNoteRow("Высота", size.height, "мм"),
      valueNoteRow("Ширина", size.width, "мм"),
      valueNoteRow("Длина", size.length, "мм"),
    ]
  }

  function tubeRows(tube: Tube): Row[] {
    const leftLabel = "Расстояние от центра до левой стенки корпуса"

    return [
      valueNoteRow("Диаметр", tube.diameter, "мм"),
      { label: "Сторона корпуса", value: frameSideLabel[tube.placed], note: "" },
      valueNoteRow("Расстояние от центра до пола", tube.position.floor, "мм"),
      tube.position.left === "center"
        ? { label: leftLabel, value: "по центру", note: "" }
        : valueNoteRow(leftLabel, tube.position.left, "мм"),
    ]
  }

  function imageUrl(image: string): string {
    return boiler.dataPath === undefined
      ? BoilerPath.toUrl(image)
      : BoilerPath.toImageUrl(boiler.dataPath, image)
  }

  $: sections = [
    { title: "Корпус", rows: sizeRows(boiler.frame) },
    { title: "Ножки", rows: sizeRows(boiler.leg) },
    { title: "Загрузочная камера", rows: sizeRows(boiler.chamber) },
    { title: "Дымоход", rows: tubeRows(boiler.chimney) },
    { title: "Патрубок подачи воды", rows: tubeRows(boiler.waterInlet) },
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

  {#if boiler.images.length > 0}
    <section class={concat([
      "space-y-2",
    ])}>
      <div class={concat([
        "flex",
        "overflow-auto",
        "mx-auto",
        "size-full",
        "h-96",
        "max-w-[500px]",
      ])}>
        <Carousel slides={(() =>
          boiler.images.map(path => ({
            src: imageUrl(path),
          }))
        )()} />
      </div>
    </section>
  {/if}

  {#each sections as { title, rows }}
    <section class={concat([
      "space-y-2",
    ])}>
      <H2>{title}</H2>

      <Table last={true}>
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
      </Table>
    </section>
  {/each}
</article>
