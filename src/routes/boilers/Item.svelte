<script lang="ts">
  import { link } from "svelte-spa-router"

  import { Boiler, BoilerId, type BoilerUrl } from "../../lib/boiler"
  import { concat } from "../../lib/utils"

  export let url: BoilerUrl
  export let boiler: Boiler

  $: id = BoilerId.fromUrl(url)
</script>

<a
  use:link
  href={`/boilers/${id}`}
  class={concat([
    "text-blue-800",
    "dark:text-blue-400",
  ])}
>
  {boiler.name}
</a>
