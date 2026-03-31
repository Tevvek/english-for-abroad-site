<script lang="ts">
  import type { Movie } from "@/types/resources";
  import ImageSkeleton from "./ImageSkeleton.svelte";
  import cn from "@/utils/cn";

  let { movies } = $props<{ movies: Movie[] }>();

  function getViewTransitionName(movie: Movie) {
    return movie.slug ? movie.slug : movie.title.replaceAll(" ", "");
  }
</script>

<div
  class="flex snap-x snap-mandatory overflow-x-auto"
  style="scrollbar-width: none;"
>
  {#each movies as movie (movie.title)}
    <div class="box-border shrink-0 basis-full snap-start px-3 py-2 pb-10 md:basis-1/2 lg:basis-1/3 xl:basis-1/4 min-[2560px]:basis-1/5">
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
    </div>
  {/each}

  {#if movies.length === 0}
    <div class="box-border shrink-0 basis-full snap-start px-3 py-2 pb-10 md:basis-1/2 lg:basis-1/3 xl:basis-1/4 min-[2560px]:basis-1/5">
      <div class="flex h-[392px] items-center justify-center rounded-xl border bg-card p-4 shadow-sm">
        <p>Coming soon! 🚀</p>
      </div>
    </div>
  {/if}
</div>
