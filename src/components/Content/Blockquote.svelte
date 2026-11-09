<script lang="ts">
  import { concat } from "../../lib/utils"
</script>

<blockquote class={concat([
  "relative",
  "overflow-hidden",
  "px-4",
  "py-2",
  "bg-gray-200",
  "dark:bg-gray-700",
  "before:absolute",
  "before:left-0",
  "before:top-0",
  "before:w-1",
  "before:h-full",
  "before:bg-gray-600",
  "before:dark:bg-gray-600",
])}>
  <slot />
</blockquote>
