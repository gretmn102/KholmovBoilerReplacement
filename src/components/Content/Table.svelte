<script lang="ts">
  import { concat } from "../../lib/utils"

  export let last: boolean
</script>

<div class={concat([
  "overflow-x-auto",
  last ? "" : "mb-2",
])}>
  <table class={concat([
    "w-full",
    "border-collapse",
    "text-left",
  ])}>
    <slot />
  </table>
</div>
