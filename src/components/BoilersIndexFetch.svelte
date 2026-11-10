<script lang="ts">
  import { BoilersIndex } from "../lib/boilersIndex"
  import Fetch from "../components/Fetch.svelte"
  import Result from "../components/Result.svelte"

  interface $$Slots {
    default: {
      boilersIndex: BoilersIndex
    }
  }

  const url = "./boilers/index.yaml"
  const fetchContext = `get ${url}`
</script>

<Fetch {url} let:resolved>
  <Result context={fetchContext} result={resolved} let:ok={json}>
    <Result context={fetchContext} result={BoilersIndex.fromYaml(json)} let:ok={boilersIndex}>
      <slot boilersIndex={boilersIndex} />
    </Result>
  </Result>
</Fetch>
