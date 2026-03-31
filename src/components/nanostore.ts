import { PodcastsThemes, TvShowsThemes } from "@/types/resources";
import { atom } from "nanostores";

export const selectedPodcast = atom<PodcastsThemes>(PodcastsThemes.Art);
export const selectedTvShow = atom<TvShowsThemes>(TvShowsThemes.Comedy);
export const selectedMovie = atom<string>(TvShowsThemes.Comedy);

export const carouselsReady = atom<number>(0);
export const totalCarousels = atom<number>(0);
