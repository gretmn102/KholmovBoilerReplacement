<script lang="ts">
  import { Boiler, type BoilerId } from "../lib/boiler"
  import Fetch from "./Fetch.svelte"
  import Result from "./Result.svelte"

	interface $$Slots {
    default: {
      boiler: Boiler
    }
  }

  export let id: BoilerId
  const url = `./boilers/${id}.yaml`
  const fetchContext = `get ${url}`
</script>

<Fetch url={url} let:resolved>
  <Result context={fetchContext} result={resolved} let:ok={json}>
    <Result context={fetchContext} result={Boiler.fromYaml(json)} let:ok={boiler}>
      <slot boiler={boiler} />
    </Result>
  </Result>
</Fetch>
