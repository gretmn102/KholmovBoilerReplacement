<script lang="ts">
  import { BoilerUrl, type BoilerId } from "../../../lib/boiler"
  import BoilerFetch from "../../../components/BoilerFetch.svelte"

  export let params: {
    id: BoilerId
  }

  export let id: BoilerId = params.id
</script>

<BoilerFetch url={BoilerUrl.fromId(id)} let:boiler>
  {JSON.stringify(boiler, undefined, 2)}
</BoilerFetch>
