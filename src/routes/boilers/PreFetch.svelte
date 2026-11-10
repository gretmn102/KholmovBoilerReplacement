<script lang="ts">
  import { Boiler, type BoilerId } from "../../lib/boiler"
  import Fetch from "../../components/Fetch.svelte"
  import Result from "../../components/Result.svelte"

	interface $$Slots {
    default: {
      boiler: Boiler
    }
  }

  export let id: BoilerId
  const url = `./boilers/${id}.json`
  const fetchContext = `get ${url}`
</script>

<Fetch url={url} let:resolved>
  <Result context={fetchContext} result={resolved} let:ok={json}>
    <Result context={fetchContext} result={Boiler.fromJson(json)} let:ok={boiler}>
      <slot boiler={boiler} />
    </Result>
  </Result>
</Fetch>
