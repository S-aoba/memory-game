import { atom } from 'jotai'

import type { CardType, CpuType } from '@/common/type/type'

export const cpuAtom = atom<CpuType>({
  memoryCardList: [],
  cpuCardList: [],
})

export const removeCardInMemoryAtom = atom(null, (get, set, targetCard: CardType) => {
  const newMemoryCard = get(cpuAtom).memoryCardList.filter((memoryCard: CardType) => {
    return memoryCard !== targetCard
  })
  set(cpuAtom, {
    ...get(cpuAtom),
    memoryCardList: newMemoryCard,
  })
})

export const resetMemoryAtom = atom(null, (get, set) => {
  set(cpuAtom, {
    ...get(cpuAtom),
    memoryCardList: [],
  })
})

export const addCpuCardListAtom = atom(null, (get, set, firstCard: CardType, secondCard: CardType) => {
  const newCpuCardList = {
    first: firstCard,
    second: secondCard,
  }
  set(cpuAtom, {
    ...get(cpuAtom),
    cpuCardList: [...get(cpuAtom).cpuCardList, newCpuCardList],
  })
})

export const addMemoryAtom = atom(null, (get, set, firstCard: CardType, secondCard: CardType) => {
  set(cpuAtom, {
    ...get(cpuAtom),
    memoryCardList: [...get(cpuAtom).memoryCardList, firstCard, secondCard],
  })
})
