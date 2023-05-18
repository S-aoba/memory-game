import { atom } from 'jotai'

export const isFrontAtom = atom<boolean>(false)
export const toggleIsFrontAtom = atom(
  (get) => get(isFrontAtom),
  (get, set) => {
    set(isFrontAtom, !get(isFrontAtom))
  }
)
