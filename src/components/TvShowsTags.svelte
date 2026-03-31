<script lang="ts">
  import { cn } from "@/lib/utils";
  import { Button } from "@/components/ui/button";
  import { TvShowsThemes } from "@/types/resources";
  import { selectedTvShow } from "@/components/nanostore";

  let selectedTheme = $state(selectedTvShow.get());

  $effect(() => {
    document.querySelectorAll("[data-tvshow-theme]").forEach((el) => {
      (el as HTMLElement).hidden = el.getAttribute("data-tvshow-theme") !== selectedTheme;
    });
  });

  function selectTheme(theme: TvShowsThemes) {
    selectedTheme = theme;
    document.querySelectorAll("[data-tvshow-theme]").forEach((el) => {
      const isActive = el.getAttribute("data-tvshow-theme") === theme;
      (el as HTMLElement).hidden = !isActive;
      if (isActive) (el as HTMLElement).scrollLeft = 0;
    });
  }
</script>

<div class="flex overflow-x-auto scroll-smooth px-4 md:px-8 py-4" style="scrollbar-width: none;">
  <div class="flex gap-2 min-w-max ml-auto">
    {#each Object.values(TvShowsThemes) as tag (tag)}
      <Button
        size="sm"
        variant={selectedTheme === tag ? "default" : "outline"}
        class={cn("rounded-full text-xs uppercase tracking-[0.16em]", selectedTheme !== tag && "bg-card")}
        onclick={() => selectTheme(tag)}
      >
        {tag}
      </Button>
    {/each}
  </div>
</div>
