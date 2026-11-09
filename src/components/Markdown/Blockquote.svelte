<script lang="ts">
  import { type Token, type Tokens } from "marked"

  import Blockquote from "../Content/Blockquote.svelte"
  import Block from "./Block.svelte"

  export let token: Token
  const blockquote = token as Tokens.Blockquote
  const isLast = (index: number) =>
    index === blockquote.tokens.length - 1
</script>

<Blockquote>
  {#each blockquote.tokens as item, index}
    <Block token={item} last={isLast(index)} />
  {/each}
</Blockquote>
