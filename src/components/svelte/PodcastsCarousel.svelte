<script lang="ts">
  import ContentCarousel from "@/components/ui/ContentCarousel.svelte";
  import PodcastCardSlide from "@/components/svelte/PodcastCardSlide.svelte";
  import type { Podcast } from "@/types/resources";

  let { podcasts } = $props<{ podcasts: Podcast[] }>();

  const breakpoints = {
    480: { slidesPerView: 2, spaceBetween: 0 },
    768: { slidesPerView: 3, spaceBetween: 0 },
    1024: { slidesPerView: 4, spaceBetween: 0 },
    1280: { slidesPerView: 5, spaceBetween: 0 },
    1536: { slidesPerView: 6, spaceBetween: 0 },
  };
</script>

<ContentCarousel
  items={podcasts}
  keyPrefix="podcasts"
  minHeightClass="min-h-[460px] md:min-h-[520px]"
  swiperClass="!px-0"
  slideClass="box-border h-auto px-3 py-2 pb-10"
  breakpoints={breakpoints}
>
  {#snippet children(item)}
    <PodcastCardSlide podcast={item as Podcast} />
  {/snippet}
</ContentCarousel>
