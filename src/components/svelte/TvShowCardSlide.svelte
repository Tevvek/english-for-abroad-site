<script lang="ts">
  import type { TvShow } from "@/types/resources";
  import ImageSkeleton from "@/components/ImageSkeleton.svelte";

  let { tvShow } = $props<{ tvShow: TvShow }>();

  let viewTransitionName = $derived(
    tvShow.slug ? tvShow.slug : tvShow.title.replaceAll(" ", "")
  );
</script>

<a
  href={tvShow.url}
  class="flex h-full w-full flex-col items-start gap-4 rounded-xl border bg-card p-4 text-card-foreground shadow-sm transition duration-300 hover:-translate-y-1"
>
  <ImageSkeleton class="aspect-[9/16] w-full shrink-0 rounded-xl bg-muted">
    <img
      src={typeof tvShow.image === "string" ? tvShow.image : tvShow.image.src}
      alt={tvShow.title}
      loading="lazy"
      class="block size-full rounded-xl object-contain"
      style:view-transition-name={viewTransitionName}
    />
  </ImageSkeleton>
  <div class="flex w-full min-w-0 flex-1 flex-col items-start justify-start">
    <h3 class="line-clamp-1 font-bold">{tvShow.title}</h3>
    <p class="mt-2 line-clamp-4 text-sm" title={tvShow.longDescription}>
      {tvShow.longDescription}
    </p>
  </div>
</a>
