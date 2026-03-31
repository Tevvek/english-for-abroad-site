<script lang="ts">
  import { cn } from "@/lib/utils";
  import { Button } from "@/components/ui/button";
  import { TvShowsThemes } from "@/types/resources";

  let {
    selectedTheme,
    onSelect,
  } = $props<{
    selectedTheme: TvShowsThemes;
    onSelect: (theme: TvShowsThemes) => void;
  }>();
</script>

<div class="flex overflow-x-auto scroll-smooth px-4 md:px-8 py-4" style="scrollbar-width: none;">
  <div class="flex gap-2 min-w-max ml-auto">
    {#each Object.values(TvShowsThemes) as tag (tag)}
      <Button
        size="sm"
        variant={selectedTheme === tag ? "default" : "outline"}
        class={cn("rounded-full text-xs uppercase tracking-[0.16em]", selectedTheme !== tag && "bg-card")}
        onclick={() => onSelect(tag)}
      >
        {tag}
      </Button>
    {/each}
  </div>
</div>
