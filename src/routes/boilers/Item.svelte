<script lang="ts">
  import { link } from "svelte-spa-router"

  import { concat } from "../../lib/utils"
  import { Boiler, type BoilerId } from "../../lib/boiler"

  export let id: BoilerId
  export let boiler: Boiler
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
