<script lang="ts">
  import Router, { type RouteDefinition } from "svelte-spa-router"

  import Boilers from "./boilers/Index.svelte"
  import Boiler from "./boilers/[id]/Index.svelte"
  import MyBoiler from "./MyBoiler.svelte"

  export const routes: RouteDefinition = {
    "/": MyBoiler,
    "/boilers": Boilers,
    "/boilers/:id": Boiler,
  }
</script>

<Router routes={routes} />
