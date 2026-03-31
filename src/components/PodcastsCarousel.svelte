<script lang="ts">
  import type { Podcast } from "@/types/resources";
  import ImageSkeleton from "./ImageSkeleton.svelte";

  let { podcasts } = $props<{ podcasts: Podcast[] }>();

  function getImageSrc(image: Podcast["image"]) {
    return typeof image === "string" ? image : image.src;
  }
</script>

<div
  class="flex snap-x snap-mandatory overflow-x-auto"
  style="scrollbar-width: none;"
>
  {#each podcasts as podcast (podcast.title)}
    <div class="box-border flex shrink-0 basis-full snap-start px-3 py-2 pb-10 min-[480px]:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5 2xl:basis-[16.6666%]">
      <a
        href={podcast.url}
        class="flex h-full w-full flex-col items-start gap-4 rounded-xl border bg-card p-4 text-card-foreground shadow-sm transition duration-300 hover:-translate-y-1"
      >
        <ImageSkeleton class="aspect-square w-full shrink-0 rounded-xl bg-muted">
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
          <h3 class="line-clamp-1 font-bold">{podcast.title}</h3>
          <p class="mt-2 line-clamp-4 text-sm" title={podcast.longDescription}>
            {podcast.longDescription}
          </p>
        </div>
      </a>
    </div>
  {/each}

  {#if podcasts.length === 0}
    <div class="box-border flex shrink-0 basis-full snap-start px-3 py-2 pb-10 min-[480px]:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5 2xl:basis-[16.6666%]">
      <div class="flex h-full w-full items-center justify-center rounded-xl border bg-card p-4 shadow-sm">
        <p>Coming soon! 🚀</p>
      </div>
    </div>
  {/if}
</div>
