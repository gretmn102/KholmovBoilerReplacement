<script lang="ts">
  import Markdown from "../components/Markdown/Index.svelte"
  import Fetch from "../components/Fetch.svelte"
  import Result from "../components/Result.svelte"
</script>

<Fetch url="./index.md" let:resolved>
  <Result result={resolved} let:ok>
    <Markdown content={ok} />
  </Result>
</Fetch>
