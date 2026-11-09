<script lang="ts">
  import { concat } from "./lib/utils"
  import Markdown from "./components/Markdown/Index.svelte"
</script>

<main>
  <div class={concat([
    "flex",
    "justify-center",
  ])}>
    <div class={concat([
      "relative", // for children with absolute
      "w-full",
      "h-dvh",
      "h-[calc(var(--vh,_1vh)_*_100)]",
      "bg-gray-200",
      "dark:bg-gray-800",
      "dark:text-white",
      "flex",
      "flex-col",
    ])}>
      <Markdown content="# Hello world
[Link]() привет" />
    </div>
  </div>
</main>
