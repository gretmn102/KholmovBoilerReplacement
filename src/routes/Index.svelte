<script lang="ts">
  import Router, { type RouteDefinition } from "svelte-spa-router"

  import Boiler from "./boilers/[id]/Index.svelte"
  import MyBoiler from "./MyBoiler.svelte"

  export const routes: RouteDefinition = {
    "/": MyBoiler,
    "/boilers/:id": Boiler,
  }
</script>

<Router routes={routes} />
