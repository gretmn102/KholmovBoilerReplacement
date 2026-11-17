<script lang="ts">
  import { type BoilerId } from "../../../lib/boiler"
  import BoilerFetch from "../../../components/BoilerFetch.svelte"
  import BoilersIndexFetch from "../../../components/BoilersIndexFetch.svelte"
  import Option from "../../../components/Option.svelte"
  import { BoilersIndex } from "../../../lib/boilersIndex"
  import Boiler from "./Boiler.svelte"

  export let params: {
    id: BoilerId
  }

  export let id: BoilerId = params.id
</script>

<BoilersIndexFetch let:boilersIndex>
  <Option
    result={BoilersIndex.getPath(boilersIndex, id)}
    let:ok={url}
    context={`Not found path for ${id} id!`}
  >
    <BoilerFetch path={url} let:boiler>
      <Boiler {boiler} />
    </BoilerFetch>
  </Option>
</BoilersIndexFetch>
