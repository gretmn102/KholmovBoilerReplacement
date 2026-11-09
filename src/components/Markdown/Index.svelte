<script lang="ts">
  import { marked, type TokensList } from 'marked'
  import { Option } from "@fering-org/functional-helper"

  import Block from "./Block.svelte"

  export let content = ''

  let html: Option<TokensList> = undefined

  $: {
    html = Option.mkSome(
      marked.lexer(content, { async: false, gfm: true })
    )
  }
  const isLast = (index: number) =>
    Option.reduce(
      html,
      html => index === html.length - 1,
      () => false,
    )
</script>

{#if html}
  {#each html as token, index}
    <Block token={token} last={isLast(index)} />
  {/each}
{/if}
