<script lang="ts" generics="Ok">
  import { type Option } from "@fering-org/functional-helper"

  import { concat } from "../lib/utils"

	interface $$Slots {
    default: {
      ok: Ok
    }
  }

  export let result: Option<Ok>
  export let context: unknown | undefined = undefined
</script>

{#if result === undefined}
  <div>
    <h1>Error</h1>
    <pre class={concat([
      "text-red-300"
    ])}>{JSON.stringify({ context }, undefined, 2)}</pre>
  </div>
{:else}
  <slot ok={result} />
{/if}
