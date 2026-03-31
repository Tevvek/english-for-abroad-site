<script lang="ts">
  import { onMount } from "svelte";
  import { LoaderCircle } from "lucide-svelte";
  import cn from "@/utils/cn";
  import { register } from "swiper/element/bundle";

  type BreakpointConfig = {
    slidesPerView?: number | "auto";
    spaceBetween?: number;
  };

  let {
    items,
    keyPrefix,
    minHeightClass,
    containerClass = "",
    swiperClass = "",
    slideClass = "",
    slidesPerView = 1,
    spaceBetween = 0,
    breakpoints = {},
    children,
  } = $props<{
    items: unknown[];
    keyPrefix: string;
    minHeightClass: string;
    containerClass?: string;
    swiperClass?: string;
    slideClass?: string;
    slidesPerView?: number | "auto";
    spaceBetween?: number;
    breakpoints?: Record<number, BreakpointConfig>;
    children: (item: unknown, index: number) => unknown;
  }>();

  let isReady = $state(false);
  let swiperEl = $state<HTMLElement | null>(null);

  onMount(async () => {
    register();

    if (swiperEl) {
      Object.assign(swiperEl, {
        grabCursor: true,
        watchOverflow: true,
        mousewheel: { forceToAxis: true },
        slidesPerView,
        spaceBetween,
        breakpoints,
      });

      swiperEl.initialize();
    }

    isReady = true;
    document.dispatchEvent(new CustomEvent('carousel-ready'));
  });
</script>

<div class={cn("relative w-full", minHeightClass, containerClass)}>
  <swiper-container
    bind:this={swiperEl}
    init="false"
    class={cn(swiperClass, !isReady && "opacity-0")}
  >
    {#each items as item, index (`${keyPrefix}-${index}`)}
      <swiper-slide class={slideClass}>
        {@render children(item, index)}
      </swiper-slide>
    {/each}
  </swiper-container>
</div>
