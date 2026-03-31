<script lang="ts">
  import type { Podcast } from "@/types/resources";
  import ImageSkeleton from "@/components/ImageSkeleton.svelte";

  let { podcast } = $props<{ podcast: Podcast }>();

  let viewTransitionName = $derived(
    podcast.slug ? podcast.slug : podcast.title.replaceAll(" ", "")
  );
</script>

<a
  href={podcast.url}
  class="flex h-full w-full flex-col items-start gap-4 rounded-xl border bg-card p-4 text-card-foreground shadow-sm transition duration-300 hover:-translate-y-1"
>
  <ImageSkeleton class="aspect-square w-full shrink-0 rounded-xl bg-muted">
    <img
      src={typeof podcast.image === "string" ? podcast.image : podcast.image.src}
      alt={podcast.title}
      loading="lazy"
      class="block size-full rounded-xl object-contain"
      style:view-transition-name={viewTransitionName}
    />
  </ImageSkeleton>
  <div class="flex w-full min-w-0 flex-1 flex-col items-start justify-start">
    <h3 class="line-clamp-1 font-bold">{podcast.title}</h3>
    <p class="mt-2 line-clamp-4 text-sm" title={podcast.longDescription}>
      {podcast.longDescription}
    </p>
  </div>
</a>
