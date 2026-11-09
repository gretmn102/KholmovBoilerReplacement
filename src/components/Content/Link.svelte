<script lang="ts">
  import { concat } from "../../lib/utils"

  export let href: string
  export let title: string | undefined | null = undefined
</script>

<a
  class={concat([
    "text-blue-800",
    "dark:text-blue-400",
  ])}
  {href}
  {title}
  target="_blank"
>
  <slot />
</a>
