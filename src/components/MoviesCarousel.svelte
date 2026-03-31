<script lang="ts">
  import type { Movie } from "@/types/resources";
  import ImageSkeleton from "./ImageSkeleton.svelte";
  import cn from "@/utils/cn";
  import ContentCarousel from "@/components/ui/ContentCarousel.svelte";

  let { movies } = $props<{ movies: Movie[] }>();

  const breakpoints = {
    768: { slidesPerView: 2, spaceBetween: 0 },
    1024: { slidesPerView: 3, spaceBetween: 0 },
    1280: { slidesPerView: 4, spaceBetween: 0 },
    2560: { slidesPerView: 5, spaceBetween: 0 },
  };

  function getViewTransitionName(movie: Movie) {
    return movie.slug ? movie.slug : movie.title.replaceAll(" ", "");
  }
</script>

{#if movies.length > 0}
  <ContentCarousel
    items={movies}
    keyPrefix="movie"
    minHeightClass="min-h-[420px] md:min-h-[430px]"
    slideClass="box-border h-auto px-3 py-2 pb-10"
    breakpoints={breakpoints}
  >
    {#snippet children(item)}
      {@const movie = item as Movie}
      <a
        href={movie.url}
        class={cn(
          "grid h-[392px] grid-rows-[min-content_min-content_auto] gap-x-4 rounded-xl border bg-card p-4 text-card-foreground shadow-sm transition duration-300 hover:-translate-y-1",
          "xs:h-60 xs:grid-cols-[auto_1fr] xs:grid-rows-[auto_1fr]"
        )}
      >
        <h3 class="font-bold xs:col-start-2 xs:row-start-1">
          {movie.title}
        </h3>
        <p
          class="mb-2 text-sm line-clamp-2 xs:col-start-2 xs:row-start-2 xs:mb-0 xs:h-fit xs:line-clamp-6"
          title={movie.longDescription}
        >
          {movie.longDescription}
        </p>

        <ImageSkeleton
          class="aspect-[2/3] w-48 self-end place-self-center rounded-xl bg-muted xs:col-start-1 xs:row-span-2 xs:w-36 xs:self-center"
        >
          <img
            src={movie.image}
            alt="movie"
            style:border-radius="0.75rem"
            style:view-transition-name={getViewTransitionName(movie)}
            loading="lazy"
            onload={(e) => {
              const prev = (e.target as HTMLImageElement).previousElementSibling as HTMLDivElement;
              if (prev) prev.style.display = "none";
            }}
            class="h-full object-cover"
          />
        </ImageSkeleton>
      </a>
    {/snippet}
  </ContentCarousel>
{:else}
  <div class="px-3 py-2 pb-10">
    <div class="flex h-[392px] items-center justify-center rounded-xl border bg-card p-4 shadow-sm">
      <p>Coming soon! 🚀</p>
    </div>
  </div>
{/if}
    </div>
  {/if}
</div>
