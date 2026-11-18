<script lang="ts">
  import { concat } from "../lib/utils"

  type Slide = {
    src: string
    alt: string
  }

  export let slides: Slide[] = []

  let current = 0
  let startX = 0

  function next() {
    if (slides.length > 0) {
      current = (current + 1) % slides.length
    }
  }

  function previous() {
    if (slides.length > 0) {
      current = (current - 1 + slides.length) % slides.length
    }
  }

  function handlePointerDown(event: PointerEvent) {
    startX = event.clientX;
    (event.currentTarget as HTMLElement).setPointerCapture(event.pointerId)
  }

  function handlePointerUp(event: PointerEvent) {
    const distance = event.clientX - startX

    if (distance > 50) previous()
    if (distance < -50) next()
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === "ArrowRight") {
      event.preventDefault()
      next()
    }

    if (event.key === "ArrowLeft") {
      event.preventDefault()
      previous()
    }
  }
</script>

{#if slides.length > 0}
  <section
    class={concat([
      "size-full",
      "overflow-y-auto",
      "flex",
      "flex-col",
    ])}
    aria-roledescription="карусель"
    aria-label="Галерея изображений"
  >
    <div class={concat([
      "size-full",
      "relative",
      "flex",
      "overflow-y-auto",
    ])}>
      <div
        class={concat([
          "overflow-auto",
          "size-full",
          "flex",
          "rounded-xl",
          "touch-pan-y",
          "overflow-hidden",
        ])}
        on:pointerdown={handlePointerDown}
        on:pointerup={handlePointerUp}
      >
        <div
          class={concat([
            "size-full",
            "flex",
            "transition-transform",
            "duration-300",
            "ease-in-out",
          ])}
          style={`transform: translateX(-${current * 100}%)`}
        >
          {#each slides as slide, i}
            <div class={concat([
              "w-full",
              "shrink-0",
              "flex",
              "justify-center",
            ])}>
              <img
                src={slide.src}
                alt={slide.alt}
                class={concat([
                  "h-full",
                  "object-contain",
                  "select-none",
                ])}
                draggable="false"
                loading={i === 0 ? "eager" : "lazy"}
              />
            </div>
          {/each}
        </div>
      </div>

      <button
        type="button"
        class="absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/50 px-3 py-2 text-xl font-medium text-white hover:bg-black/70 focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label="Предыдущее изображение"
        on:click={previous}
        on:keydown={handleKeydown}
      >
        &lt;
      </button>

      <button
        type="button"
        class="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/50 px-3 py-2 text-xl font-medium text-white hover:bg-black/70 focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label="Следующее изображение"
        on:click={next}
        on:keydown={handleKeydown}
      >
        &gt;
      </button>
    </div>

    <div class="mt-3 flex justify-center gap-2">
      {#each slides as _, i}
        <button
          type="button"
          class="h-2.5 w-2.5 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          class:bg-blue-600={i === current}
          class:bg-gray-300={i !== current}
          aria-label={`Перейти к изображению ${i + 1}`}
          aria-current={i === current ? "true" : undefined}
          on:click={() => (current = i)}
          on:keydown={handleKeydown}
        />
      {/each}
    </div>
  </section>
{/if}
