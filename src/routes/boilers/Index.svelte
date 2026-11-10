<script lang="ts">
  import BoilersIndexFetch from "../../components/BoilersIndexFetch.svelte"
  import H1 from "../../components/Content/H1.svelte"
  import { concat } from "../../lib/utils"
  import Item from "./Item.svelte"
  import BoilerFetch from "../../components/BoilerFetch.svelte"
  import { BoilerPath } from "../../lib/boilersIndex";
</script>

<H1>Котлы</H1>

<BoilersIndexFetch let:boilersIndex>
  {#if boilersIndex.length === 0}
    <p>Список котлов пуст.</p>
  {:else}
    <ul class={concat([
      "pl-4",
      "list-disc",
    ])}>
      {#each boilersIndex as boilerIndexItem}
        <li>
          <BoilerFetch url={BoilerPath.toUrl(boilerIndexItem.path)} let:boiler>
            <Item id={boilerIndexItem.id} boiler={boiler} />
          </BoilerFetch>
        </li>
      {/each}
    </ul>
  {/if}
</BoilersIndexFetch>
