<script lang="ts">
  import { onDestroy, type Snippet } from "svelte";
  import Menu from "lucide-svelte/icons/menu";
  import X from "lucide-svelte/icons/x";
  import { buttonVariants } from "@/components/ui/button";
  import { NAV } from "@/utils/constants";
  import Instagram from "@/icons/instagram.svg?raw";
  import TikTok from "@/icons/tiktok.svg?raw";
  import Facebook from "@/icons/facebook.svg?raw";
  import KakaoTalk from "@/icons/kakaotalk.svg?raw";
  import YouTube from "@/icons/youtube.svg?raw";

  let { children, logoOnly = false } = $props<{
    children?: Snippet;
    logoOnly?: boolean;
  }>();
  let isOpen = $state(false);

  function updateScrollbarWidth() {
    if (typeof window === "undefined") return;

    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;
    document.documentElement.style.setProperty(
      "--scroll-offset",
      `${scrollbarWidth}px`,
    );
  }

  function applyBodyLock(open: boolean) {
    if (typeof document === "undefined") return;

    updateScrollbarWidth();
    document.body.style.overflow = open ? "hidden" : "";
    document.body.style.paddingRight = open ? "var(--scroll-offset)" : "";
  }

  function toggleMenu() {
    isOpen = !isOpen;
    applyBodyLock(isOpen);
  }

  function closeMenu() {
    isOpen = false;
    applyBodyLock(false);
  }

  onDestroy(() => {
    applyBodyLock(false);
  });
</script>

<svelte:window onresize={updateScrollbarWidth} />

<header
  class="mobile-header sticky top-0 bg-background lg:hidden relative isolate z-navbar"
  style:z-index="var(--z-index-navbar)"
  style:margin-right={!logoOnly && isOpen
    ? "calc(-1 * var(--scroll-offset))"
    : ""}
>
  <div
    class="pointer-events-none absolute inset-x-0 top-full h-12 bg-gradient-to-b from-background via-background/85 to-transparent"
  ></div>
  <div
    class="mobile-visible-navbar grid grid-cols-[1fr_auto_1fr] bg-background px-4 py-4"
    style:padding-right={!logoOnly
      ? "calc(1rem + var(--scroll-offset, 0px))"
      : undefined}
  >
    <div class="col-start-2">
      <a href="/#" class="block w-[180px]">
        {#if children}
          {@render children()}
        {/if}
      </a>
    </div>
    {#if !logoOnly}
      <button
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        onclick={toggleMenu}
        class="justify-self-end self-start rounded-md border bg-card p-2 text-foreground shadow-xs transition hover:bg-accent hover:text-accent-foreground"
      >
        {#if isOpen}
          <X />
        {:else}
          <Menu />
        {/if}
      </button>
    {/if}
  </div>

  {#if !logoOnly && isOpen}
    <div
      class="mobile-sliding-navbar animate-in fade-in slide-in-from-top-2 absolute top-full left-0 flex h-screen w-full flex-col gap-y-5 bg-background px-8 py-8 text-foreground shadow-sm duration-300"
      style:padding-right="calc(1rem + var(--scroll-offset, 0px))"
    >
      <nav class="contents">
        {#each NAV as item (item.href)}
          <a
            onclick={closeMenu}
            href={item.href}
            class={buttonVariants({ variant: "outline", size: "lg" })}
          >
            {item.text}
          </a>
        {/each}
      </nav>

      <a
        class={buttonVariants({ variant: "outline", size: "lg" })}
        href="https://app.englishforabroad.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        Dashboard
      </a>

      <div
        class="flex gap-x-4 border-t pt-4 text-muted-foreground [&_svg]:size-5"
      >
        <a
          class="transition hover:text-primary focus:text-primary"
          href="https://www.instagram.com/englishforabroad/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
        >
          {@html Instagram}
        </a>
        <a
          class="transition hover:text-primary focus:text-primary"
          href="https://www.tiktok.com/@englishforabroad_"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="TikTok"
        >
          {@html TikTok}
        </a>
        <a
          class="transition hover:text-primary focus:text-primary"
          href="https://www.facebook.com/englishforabroad"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Facebook"
        >
          {@html Facebook}
        </a>
        <a
          class="transition hover:text-primary focus:text-primary"
          href="https://qr.kakao.com/talk/eITDYcRJFmPdb0Wj7cwSkJbGBx4-"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="KakaoTalk"
        >
          {@html KakaoTalk}
        </a>
        <a
          class="transition hover:text-primary focus:text-primary"
          href="https://www.youtube.com/@englishforabroad"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="YouTube"
        >
          {@html YouTube}
        </a>
      </div>

      <a
        class="w-fit text-sm font-semibold uppercase tracking-[0.18em] text-primary underline decoration-primary/40 underline-offset-4 transition hover:text-foreground focus:text-foreground"
        href="mailto:ali@englishforabroad.com"
      >
        ali@englishforabroad.com
      </a>
    </div>
  {/if}
</header>
