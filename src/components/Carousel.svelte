<script lang="ts">
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
    if (event.key === "ArrowRight") next()
    if (event.key === "ArrowLeft") previous()
  }
</script>

{#if slides.length > 0}
  <section
    class="mx-auto w-full max-w-3xl"
    role="region"
    aria-roledescription="карусель"
    aria-label="Галерея изображений"
    on:keydown={handleKeydown}
    tabindex="0"
  >
    <div
      class="overflow-hidden rounded-xl"
      on:pointerdown={handlePointerDown}
      on:pointerup={handlePointerUp}
    >
      <div
        class="flex transition-transform duration-300 ease-in-out"
        style={`transform: translateX(-${current * 100}%)`}
      >
        {#each slides as slide, i}
          <div class="w-full shrink-0">
            <img
              src={slide.src}
              alt={slide.alt}
              class="block aspect-video w-full select-none object-cover"
              draggable="false"
              loading={i === 0 ? "eager" : "lazy"}
            />
          </div>
        {/each}
      </div>
    </div>

    <div class="mt-4 flex items-center justify-between gap-4">
      <button
        type="button"
        class="rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label="Предыдущее изображение"
        on:click={previous}
      >
        Назад
      </button>

      <p class="text-sm text-gray-600" aria-live="polite">
        {current + 1} / {slides.length}
      </p>

      <button
        type="button"
        class="rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label="Следующее изображение"
        on:click={next}
      >
        Далее
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
        />
      {/each}
    </div>
  </section>
{/if}
