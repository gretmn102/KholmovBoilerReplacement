<script lang="ts">
  import { Boiler } from "../lib/boiler"
  import { BoilerPath } from "../lib/boilersIndex"
  import Fetch from "./Fetch.svelte"
  import Result from "./Result.svelte"

	interface $$Slots {
    default: {
      boiler: Boiler
    }
  }

  export let path: string
  const url = BoilerPath.toUrl(path)
  const fetchContext = `get ${url}`
</script>

<Fetch url={url} let:resolved>
  <Result context={fetchContext} result={resolved} let:ok={json}>
    <Result
      context={fetchContext}
      result={Boiler.fromYaml(json, path)}
      let:ok={boiler}
    >
      <slot boiler={boiler} />
    </Result>
  </Result>
</Fetch>
