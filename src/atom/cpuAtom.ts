import { atom } from 'jotai'

import type { CardType, CpuType } from '@/common/type/type'

export const cpuAtom = atom<CpuType>({
  memoryCardList: [],
  cpuCardList: [],
})

export const addMemoryCardListByUserAtom = atom(null, (get, set, card: CardType) => {
  const currentMemoryCardList = get(cpuAtom).memoryCardList
  const currentMemoryCardListLength = currentMemoryCardList.length
  if (currentMemoryCardListLength === 0) {
    const newMemoryCardList = [...currentMemoryCardList, card]
    set(cpuAtom, {
      ...get(cpuAtom),
      memoryCardList: newMemoryCardList,
    })
    return
  }
  // memoryCardListの重複を削除
  const remainingMemoryCardList = currentMemoryCardList.filter((memoryCard) => {
    return memoryCard.id !== card.id
  })
  const newMemoryCardList = [...remainingMemoryCardList, card]
  set(cpuAtom, {
    ...get(cpuAtom),
    memoryCardList: newMemoryCardList,
  })
  return
})
