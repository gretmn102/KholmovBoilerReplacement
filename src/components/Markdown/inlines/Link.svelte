<script lang="ts">
  import { type Token, type Tokens } from "marked"

  import Link from "../../Content/Link.svelte"
  import Inlines from "../Inlines.svelte"

  export let token: Token
  let link = token as Tokens.Link
</script>

<Link
  href={link.href}
  title={link.title}>
  <Inlines tokens={link.tokens} />
</Link>
