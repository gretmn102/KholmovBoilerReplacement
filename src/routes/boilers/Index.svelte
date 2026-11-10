<script lang="ts">
  import { link } from "svelte-spa-router"

  import { BoilerSummary } from "../../lib/boiler"
  import Fetch from "../../components/Fetch.svelte"
  import Result from "../../components/Result.svelte"
  import H1 from "../../components/Content/H1.svelte"
  import { concat } from "../../lib/utils"

  const url = "./boilers/index.json"
  const fetchContext = `get ${url}`
</script>

<H1>Котлы</H1>

<Fetch {url} let:resolved>
  <Result context={fetchContext} result={resolved} let:ok={json}>
    <Result context={fetchContext} result={BoilerSummary.listFromJson(json)} let:ok={boilers}>
      {#if boilers.length === 0}
        <p>Список котлов пуст.</p>
      {:else}
        <ul class={concat([
          "pl-4",
          "list-disc",
        ])}>
          {#each boilers as boiler}
            <li>
              <a
                use:link
                href={`/boilers/${boiler.id}`}
                class={concat([
                  "text-blue-800",
                  "dark:text-blue-400",
                ])}
              >
                {boiler.name}
              </a>
            </li>
          {/each}
        </ul>
      {/if}
    </Result>
  </Result>
</Fetch>
