<script lang="ts">
  import { type Token, type Tokens } from "marked"

  import Image from "../../Content/Image.svelte"

  export let token: Token
  let image = token as Tokens.Image
</script>

<Image
  src={image.href}
  alt={image.text}
  title={image.title} />
