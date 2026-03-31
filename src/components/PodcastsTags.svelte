<script lang="ts">
  import { cn } from "@/lib/utils";
  import { PodcastsThemes } from "@/types/resources";
  import { Button } from "./ui/button";
  import { selectedPodcast } from "@/components/nanostore";

  let selectedTheme = $state(selectedPodcast.get());

  $effect(() => {
    document.querySelectorAll("[data-podcast-theme]").forEach((el) => {
      (el as HTMLElement).hidden = el.getAttribute("data-podcast-theme") !== selectedTheme;
    });
  });

  function selectTheme(theme: PodcastsThemes) {
    selectedTheme = theme;
    document.querySelectorAll("[data-podcast-theme]").forEach((el) => {
      const isActive = el.getAttribute("data-podcast-theme") === theme;
      (el as HTMLElement).hidden = !isActive;
      if (isActive) (el as HTMLElement).scrollLeft = 0;
    });
  }
</script>

<div class="flex gap-2 overflow-x-auto scroll-smooth px-4 md:px-8 py-4" style="scrollbar-width: none;">
  {#each Object.values(PodcastsThemes) as theme (theme)}
    <Button
      value={theme}
      size="sm"
      variant={selectedTheme === theme ? "default" : "outline"}
      class={cn(
        "rounded-full text-xs uppercase tracking-[0.16em] transition-none",
        selectedTheme !== theme && "bg-card text-foreground hover:text-foreground"
      )}
      onclick={() => selectTheme(theme)}
    >
      {theme}
    </Button>
  {/each}
</div>
