<script lang="ts">
  import type { EmblaCarouselType, EmblaOptionsType } from "embla-carousel";
  import useEmblaCarousel from "embla-carousel-svelte";
  import { fromAction } from "svelte/attachments";
  import type { Podcast } from "@/types/resources";
  import ImageSkeleton from "./ImageSkeleton.svelte";

  let { podcasts } = $props<{ podcasts: Podcast[] }>();

  let options = {
    align: "start",
    loop: podcasts.length > 1,
    ssr: podcasts.length > 0 ? podcasts.map(() => 100) : [100],
    breakpoints: {
      '(min-width: 480px)': { 
        loop: podcasts.length > 2,
        ssr: podcasts.length > 0 ? podcasts.map(() => 50) : [50] 
      },
      '(min-width: 768px)': { 
        loop: podcasts.length > 3,
        ssr: podcasts.length > 0 ? podcasts.map(() => 33.333333) : [33.333333] 
      },
      '(min-width: 1024px)': { 
        loop: podcasts.length > 4,
        ssr: podcasts.length > 0 ? podcasts.map(() => 25) : [25] 
      },
      '(min-width: 1280px)': { 
        loop: podcasts.length > 5,
        ssr: podcasts.length > 0 ? podcasts.map(() => 20) : [20] 
      },
      '(min-width: 1536px)': { 
        loop: podcasts.length > 6,
        ssr: podcasts.length > 0 ? podcasts.map(() => 16.666666) : [16.666666] 
      }
    }
  } as EmblaOptionsType;
  const emblaAction = useEmblaCarousel;

  let emblaApi = $state<EmblaCarouselType | null>(null);
  let scrollSnaps = $state<number[]>([]);
  let selectedSnap = $state(0);

  function syncEmblaState(api: EmblaCarouselType) {
    scrollSnaps = api.snapList();
    selectedSnap = api.selectedScrollSnap();
  }

  function handleEmblaInit(event: CustomEvent<EmblaCarouselType>) {
    emblaApi = event.detail;
    syncEmblaState(emblaApi);
    emblaApi.on("reInit", syncEmblaState);
    emblaApi.on("select", syncEmblaState);
  }

  function goTo(index: number) {
    emblaApi?.scrollTo(index);
  }

  function getImageSrc(image: Podcast["image"]) {
    return typeof image === "string" ? image : image.src;
  }

  let emblaServerApi = useEmblaCarousel({ options });
  let renderSsrStyles = (!emblaApi);
</script>


{#if renderSsrStyles}
  <div>
    {@html '<style>' + emblaServerApi.ssrStyles('#podcasts-carousel-container', '.embla__slide') + '</style>'}
  </div>
{/if}

<div class="embla">
  <div
    class="embla__viewport"
    onemblaInit={handleEmblaInit}
    {@attach fromAction(emblaAction, () => ({ options }))}
  >
    <div class="embla__container" id="podcasts-carousel-container">
      {#each podcasts as podcast (podcast.title)}
        <div class="embla__slide flex-[0_0_100%] min-[480px]:flex-[0_0_50%] md:flex-[0_0_33.3333%] lg:flex-[0_0_25%] xl:flex-[0_0_20%] 2xl:flex-[0_0_16.6666%]">
          <a
            href={podcast.url}
            class="flex h-full w-full flex-col items-start gap-4 rounded-xl border bg-card p-4 text-card-foreground shadow-sm transition duration-300 hover:-translate-y-1"
          >
            <ImageSkeleton
              class="aspect-square w-full shrink-0 rounded-xl bg-muted"
            >
              <img
                src={getImageSrc(podcast.image)}
                alt="podcast"
                style:border-radius="0.75rem"
                style:view-transition-name={podcast.slug ? podcast.slug : podcast.title.replaceAll(" ", "")}
                loading="lazy"
                onload={(e) => {
                  const prev = (e.target as HTMLImageElement).previousElementSibling as HTMLDivElement;
                  if (prev) prev.style.display = "none";
                }}
                class="block size-full object-contain"
              />
            </ImageSkeleton>
            <div class="flex w-full min-w-0 flex-1 flex-col items-start justify-start">
              <h3 class="line-clamp-1 font-bold">
                {podcast.title}
              </h3>
              <p
                class="mt-2 line-clamp-4 text-sm"
                title={podcast.longDescription}
              >
                {podcast.longDescription}
              </p>
            </div>
          </a>
        </div>
      {/each}

      {#if podcasts.length === 0}
        <div class="embla__slide flex-[0_0_100%] min-[480px]:flex-[0_0_50%] md:flex-[0_0_33.3333%] lg:flex-[0_0_25%] xl:flex-[0_0_20%] 2xl:flex-[0_0_16.6666%]">
          <div class="flex h-full w-full items-center justify-center rounded-xl border bg-card p-4 shadow-sm">
            <p>Coming soon! 🚀</p>
          </div>
        </div>
      {/if}
    </div>
  </div>

  <div class="embla__dots" aria-label="Podcast carousel pagination">
    {#each scrollSnaps as _, index (index)}
      <button
        type="button"
        class:embla__dot--selected={index === selectedSnap}
        class="embla__dot"
        aria-label={`Go to podcast slide ${index + 1}`}
        aria-pressed={index === selectedSnap}
        onclick={() => goTo(index)}
      ></button>
    {/each}
  </div>
</div>

<style>
  .embla {
    padding-inline: 0;
  }

  .embla__viewport {
    overflow: hidden;
  }

  .embla__container {
    display: flex;
    align-items: stretch;
    gap: 0;
    touch-action: pan-y pinch-zoom;
  }

  .embla__slide {
    display: flex;
    box-sizing: border-box;
    min-width: 0;
    padding: 0.5rem 0.75rem 2.5rem;
  }

  .embla__dots {
    display: flex;
    justify-content: center;
    gap: 0.625rem;
  }

  .embla__dot {
    height: 0.75rem;
    width: 0.75rem;
    border-radius: 999px;
    background: var(--muted-foreground);
    transition: transform 150ms ease, background-color 150ms ease;
  }

  .embla__dot--selected {
    background: var(--primary);
    transform: scale(1.1);
  }

  </style>
