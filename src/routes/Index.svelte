<script lang="ts">
  import Router, { type RouteDefinition } from "svelte-spa-router"

  import Boiler from "./boilers/[id]/Index.svelte"

  export const routes: RouteDefinition = {
    "/boilers/:id": Boiler,
  }
</script>

<Router routes={routes} />
