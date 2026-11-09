<script lang="ts">
  import { Boiler, type BoilerId } from "../../../lib/boiler"
  import Fetch from "../../../components/Fetch.svelte"
  import Result from "../../../components/Result.svelte"

  export let id: BoilerId
</script>

<Fetch url={`./boilers/${id}.json`} let:resolved>
  <Result result={resolved} let:ok={json}>
    <Result result={Boiler.fromJson(json)} let:ok={boiler}>
      {JSON.stringify(boiler, undefined, 2)}
    </Result>
  </Result>
</Fetch>
