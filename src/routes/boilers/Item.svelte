<script lang="ts">
  import { link } from "svelte-spa-router"

  import { concat } from "../../lib/utils"
  import { Boiler, type BoilerId } from "../../lib/boiler"
  import { BoilerPath } from "../../lib/boilersIndex"

  export let id: BoilerId
  export let boiler: Boiler

  function imageUrl(image: string): string {
    return boiler.dataPath === undefined
      ? BoilerPath.toUrl(image)
      : BoilerPath.toImageUrl(boiler.dataPath, image)
  }

  $: name = boiler.name.value.case === "known" ? boiler.name.value.fields : "Котёл"
  $: firstImage = boiler.images?.at(0)
  $: firstImageUrl = firstImage === undefined ? undefined : imageUrl(firstImage.path)
</script>

<a
  use:link
  href={`/boilers/${id}`}
  class={concat([
    "inline-flex",
    "items-center",
    "gap-3",
    "text-blue-800",
    "dark:text-blue-400",
  ])}
>
  {#if firstImageUrl !== undefined}
    <img
      src={firstImageUrl}
      alt={name}
      class={concat([
        "size-20",
        "shrink-0",
        "rounded-lg",
        "object-contain",
      ])}
      loading="lazy"
    />
  {/if}
  <span>{name}</span>
</a>
