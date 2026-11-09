<script lang="ts">
  import { concat } from "../../lib/utils"

  export let src: string
  export let alt: string
  export let title: string | undefined | null = undefined
</script>

<img
  class={concat([
    "max-w-full",
    "h-auto",
  ])}
  src={src}
  alt={alt}
  title={title} />
