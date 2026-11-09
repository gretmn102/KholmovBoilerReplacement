<script lang="ts">
  import { concat } from "./lib/utils"
  import Markdown from "./components/Markdown/Index.svelte"
  import Fetch from "./components/Fetch.svelte"
  import Result from "./components/Result.svelte"
</script>

<main>
  <div class={concat([
    "flex",
    "flex-col",
    "h-dvh",
    "h-[calc(var(--vh,_1vh)_*_100)]",
    "bg-[#e5e5e5]",
    "dark:bg-gray-800",
    "dark:text-white",
  ])}>
    <div class={concat([
      "px-3", "sm:px-10",
      "py-8",
      "overflow-y-auto",
    ])}>
      <Fetch url="./index.md" let:resolved>
        <Result result={resolved} let:ok>
          <Markdown content={ok} />
        </Result>
      </Fetch>
    </div>
  </div>
</main>
