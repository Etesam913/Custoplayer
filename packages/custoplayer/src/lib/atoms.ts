import { CustoplayerItem, CustoplayerValues } from "@/types";
import { atom } from "jotai";

/* 
  Scope is required to prevent two custoplayer's
  from sharing the same atoms
*/
export const myScope = Symbol();
export const draggableSymbol = Symbol("draggable");
export const videoElemAtom = atom<HTMLVideoElement | null>(null)
export const getVideoElemAtom = atom((get) => get(videoElemAtom))
export const setVideoElemAtom = atom(null, (_, set, update: HTMLVideoElement) => {
  set(videoElemAtom, update)
})

export const videoContainerAtom = atom<HTMLDivElement | null>(null)
export const setVideoContainerAtom = atom(null, (_, set, update: HTMLDivElement) => {
  set(videoContainerAtom, update)
})
export const getVideoContainerAtom = atom((get) => get(videoContainerAtom))

// Video Play State
export enum PlayState {
  paused,
  playing,
  ended
}
const playStateAtom = atom<PlayState>(0)
export const getPlayStateAtom = atom((get) => get(playStateAtom))
export const setPlayStateAtom = atom(null, (_, set, update: number) => {
  set(playStateAtom, update)
})

// Controls Bar
export const showControlsBarAtom = atom(false)
export const getShowControlsBarAtom = atom((get) => get(showControlsBarAtom))
export const setShowControlsBarAtom = atom(null, (_, set, update: boolean) => {
  set(showControlsBarAtom, update)
})

// Video Dimensions
export const videoDimensionsObserverAtom = atom<ResizeObserver | null>(null)
export const videoDimensionsAtom = atom<{ height: number, width: number }>({ height: 0, width: 0 })
export const setVideoDimensionsAtom = atom(null, (_, set, update: { height: number, width: number }) => {
  set(videoDimensionsAtom, update)
})
export const getVideoDimensionsAtom = atom((get) => get(videoDimensionsAtom))

export const valuesAtom = atom<CustoplayerValues>({ src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm" })
export const getValuesAtom = atom<CustoplayerValues>((get) => get(valuesAtom))

// Rendering Items
export const itemsAtom = atom<(CustoplayerItem | undefined)[]>([])
export const getItemsAtom = atom<(CustoplayerItem | undefined)[]>((get) => get(itemsAtom))
export const setItemsAtom = atom(null, (_, set, update: (CustoplayerItem | undefined)[]) => {
  set(itemsAtom, update)
})

// Progress Bar
export const progressAtom = atom(0)

// Timeout
export const controlsBarTimeoutAtom = atom<null | NodeJS.Timeout>(null)