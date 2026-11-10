<script lang="ts" generics="Ok">
  import { type Result } from "@fering-org/functional-helper"

  import { concat } from "../lib/utils"

	interface $$Slots {
    default: {
      ok: Ok
    }
  }

  export let result: Result<Ok, any>
  export let context: unknown | undefined = undefined
</script>

{#if result[0] === "Error"}
  <div>
    <h1>Error</h1>
    <pre class={concat([
      "text-red-300"
    ])}>{JSON.stringify({ context, error: result[1]}, undefined, 2)}</pre>
  </div>
{:else}
  <slot ok={result[1]} />
{/if}
