import { atom } from "jotai";

/* 
  Scope is required to prevent two custoplayer's
  from sharing the same atoms
*/
export const myScope = Symbol();
export const videoElemAtom = atom<HTMLVideoElement | null>(null)
export const videoElemReadAtom = atom((get) => get(videoElemAtom))
export const videoElemWriteAtom = atom(null, (_, set, update: HTMLVideoElement) => {
  set(videoElemAtom, update)
})

export const srcAtom = atom('')
export const getSrcAtom = atom((get) => get(srcAtom))

export const showControlsBarAtom = atom(false)
export const getControlsBarAtom = atom((get) => get(showControlsBarAtom))
export const setControlsBarAtom = atom(null, (_, set, update: boolean) => {
  set(showControlsBarAtom, update)
})

export const videoDimensionsObserverAtom = atom<ResizeObserver | null>(null)
const videoHeightAtom = atom(0)
export const videoHeightReadAtom = atom((get) => get(videoHeightAtom))
export const setVideoHeightAtom = atom(null, (_, set, update: number) => {
  set(videoHeightAtom, update)
})

export const videoDimensionsAtom = atom<{ height: number, width: number }>({ height: 0, width: 0 })
export const setVideoDimensionsAtom = atom(null, (_, set, update: { height: number, width: number }) => {
  set(videoDimensionsAtom, update)
})
export const getVideoDimensionsAtom = atom((get) => get(videoDimensionsAtom))

