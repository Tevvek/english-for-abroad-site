<script lang="ts">
  import ContentCarousel from "@/components/ui/ContentCarousel.svelte";
  import TvShowCardSlide from "@/components/svelte/TvShowCardSlide.svelte";
  import type { TvShow } from "@/types/resources";

  let { tvShows } = $props<{ tvShows: TvShow[] }>();

  const breakpoints = {
    480: { slidesPerView: 2, spaceBetween: 0 },
    768: { slidesPerView: 3, spaceBetween: 0 },
  };
</script>

<ContentCarousel
  items={tvShows}
  keyPrefix="similar-tvshows"
  minHeightClass="min-h-[420px] md:min-h-[460px]"
  slideClass="box-border h-auto px-3 py-2 pb-10"
  breakpoints={breakpoints}
>
  {#snippet children(item)}
    <TvShowCardSlide tvShow={item as TvShow} />
  {/snippet}
</ContentCarousel>
