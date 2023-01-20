import { atom } from "jotai";

/* 
  Scope is required to prevent two custoplayer's
  from sharing the same atoms
*/
export const myScope = Symbol();
export const videoRefAtom = atom<HTMLVideoElement | null>(null)
export const videoRefReadAtom = atom((get) => get(videoRefAtom))
export const videoRefWriteAtom = atom(null, (get, set, update: HTMLVideoElement) => {
  set(videoRefAtom, update)
})

export const srcAtom = atom('')
export const getSrcAtom = atom((get) => get(srcAtom))
