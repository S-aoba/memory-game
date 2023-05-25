import { atom } from 'jotai'

import type { CardType, CpuType } from '@/common/type/type'

export const cpuAtom = atom<CpuType>({
  memoryCardList: [],
  cpuCardList: [],
})

export const addMemoryCardListByUserAtom = atom(null, (get, set, card: CardType) => {
  const currentMemoryCardList = get(cpuAtom).memoryCardList
  const newMemoryCardList = [...currentMemoryCardList, card]
  set(cpuAtom, {
    ...get(cpuAtom),
    memoryCardList: newMemoryCardList,
  })
})
