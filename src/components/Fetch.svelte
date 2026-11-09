<script lang="ts">
  import { Deferred, Result, UnionCase } from "@fering-org/functional-helper"

  import DeferredView from "./Deferred.svelte"

  type FetchError =
    | UnionCase<"GeneralError", { error: Error }>
    | UnionCase<"StatusCodeIsNotOk", { statusCode: number }>
    | UnionCase<"TextError", { error: Error }>

  type FetchResult = Result<string, FetchError>

	interface $$Slots {
    default: {
      // Without this explicit specification, the type of the `resolved` variable in `let:resolved` is defined as `T | undefined`
      resolved: FetchResult
    }
  }

  export let url: string

  let deferred: Deferred<FetchResult> = Deferred.hasNotStartedYet()

  deferred = Deferred.inProgress()

  function setResult(result: FetchResult) {
    deferred = Deferred.resolved(result)
  }

  function setError(result: FetchError) {
    setResult(Result.mkError(result))
  }

  fetch(url)
    .then(response => {
      if (!response.ok) {
        setError(
          UnionCase.mkUnionCase("StatusCodeIsNotOk", {
            statusCode: response.status,
          })
        )
        return
      }
      response.text()
        .then(text => {
          setResult(Result.mkOk(text))
        })
        .catch(err => {
          setError(
            UnionCase.mkUnionCase("TextError", {
              error: err,
            })
          )
        })
    })
      .catch(err => {
        setError(err)
      })
</script>

<DeferredView bind:deferred={deferred} let:resolved>
  <slot resolved={resolved} />
</DeferredView>
