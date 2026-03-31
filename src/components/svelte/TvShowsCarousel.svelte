<script lang="ts">
  import ContentCarousel from "@/components/ui/ContentCarousel.svelte";
  import TvShowCardSlide from "@/components/svelte/TvShowCardSlide.svelte";
  import type { TvShow } from "@/types/resources";

  let { tvShows } = $props<{ tvShows: TvShow[] }>();

  const breakpoints = {
    480: { slidesPerView: 2, spaceBetween: 0 },
    768: { slidesPerView: 3, spaceBetween: 0 },
    1024: { slidesPerView: 4, spaceBetween: 0 },
    1280: { slidesPerView: 5, spaceBetween: 0 },
    1536: { slidesPerView: 6, spaceBetween: 0 },
  };
</script>

<ContentCarousel
  items={tvShows}
  keyPrefix="tvshows"
  minHeightClass="min-h-[420px] md:min-h-[460px]"
  swiperClass="!px-0"
  slideClass="box-border h-auto px-3 py-2 pb-10"
  breakpoints={breakpoints}
>
  {#snippet children(item)}
    <TvShowCardSlide tvShow={item as TvShow} />
  {/snippet}
</ContentCarousel>
