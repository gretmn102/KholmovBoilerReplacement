<script lang="ts">
  import { BoilersIndex } from "../../lib/boilersIndex"
  import Fetch from "../../components/Fetch.svelte"
  import Result from "../../components/Result.svelte"
  import H1 from "../../components/Content/H1.svelte"
  import { concat } from "../../lib/utils"
  import Item from "./Item.svelte"
  import BoilerFetch from "../../components/BoilerFetch.svelte"

  const url = "./boilers/index.yaml"
  const fetchContext = `get ${url}`
</script>

<H1>Котлы</H1>

<Fetch {url} let:resolved>
  <Result context={fetchContext} result={resolved} let:ok={json}>
    <Result context={fetchContext} result={BoilersIndex.fromYaml(json)} let:ok={boilersIndex}>
      {#if boilersIndex.length === 0}
        <p>Список котлов пуст.</p>
      {:else}
        <ul class={concat([
          "pl-4",
          "list-disc",
        ])}>
          {#each boilersIndex as boilerId}
            <li>
              <BoilerFetch id={boilerId} let:boiler>
                <Item id={boilerId} boiler={boiler} />
              </BoilerFetch>
            </li>
          {/each}
        </ul>
      {/if}
    </Result>
  </Result>
</Fetch>
