<script lang="ts">
  import type { TvShow } from "@/types/resources";
  import ImageSkeleton from "./ImageSkeleton.svelte";

  let { tvShows } = $props<{ tvShows: TvShow[] }>();

  function getImageSrc(image: TvShow["image"]) {
    return typeof image === "string" ? image : image.src;
  }

  function getViewTransitionName(tvShow: TvShow) {
    return tvShow.slug ? tvShow.slug : tvShow.title.replaceAll(" ", "");
  }

  function getAlignmentClasses(length: number) {
    let classes = [];
    if (length < 2) classes.push("min-[480px]:justify-end");
    if (length < 3) classes.push("md:justify-end");
    if (length < 4) classes.push("lg:justify-end");
    if (length < 5) classes.push("xl:justify-end");
    if (length < 6) classes.push("2xl:justify-end");
    return classes.join(" ");
  }
</script>

<div
  class={`flex snap-x snap-mandatory overflow-x-auto ${getAlignmentClasses(tvShows.length)}`}
  style="scrollbar-width: none;"
>
  {#each tvShows as tvShow (tvShow.title)}
    <div class="box-border flex shrink-0 basis-full snap-start px-3 py-2 pb-10 min-[480px]:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5 2xl:basis-[16.6666%]">
      <a
        href={tvShow.url}
        class="flex h-full w-full flex-col items-start gap-4 rounded-xl border bg-card p-4 text-card-foreground shadow-sm transition duration-300 hover:-translate-y-1"
      >
        <ImageSkeleton class="aspect-[9/16] w-full shrink-0 rounded-xl bg-muted">
          <img
            src={getImageSrc(tvShow.image)}
            alt="tv show"
            style:border-radius="0.75rem"
            style:view-transition-name={getViewTransitionName(tvShow)}
            loading="lazy"
            onload={(e) => {
              const prev = (e.target as HTMLImageElement).previousElementSibling as HTMLDivElement;
              if (prev) prev.style.display = "none";
            }}
            class="block size-full object-contain"
          />
        </ImageSkeleton>
        <div class="flex w-full min-w-0 flex-1 flex-col items-start justify-start">
          <h3 class="line-clamp-1 font-bold">{tvShow.title}</h3>
          <p class="mt-2 line-clamp-4 text-sm" title={tvShow.longDescription}>
            {tvShow.longDescription}
          </p>
        </div>
      </a>
    </div>
  {/each}

  {#if tvShows.length === 0}
    <div class="box-border flex shrink-0 basis-full snap-start px-3 py-2 pb-10 min-[480px]:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5 2xl:basis-[16.6666%]">
      <div class="flex h-full w-full items-center justify-center rounded-xl border bg-card p-4 shadow-sm">
        <p>Coming soon! 🚀</p>
      </div>
    </div>
  {/if}
</div>
