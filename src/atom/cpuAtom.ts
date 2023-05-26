import { atom } from 'jotai'

import type { CardType, CpuType } from '@/common/type/type'

export const cpuAtom = atom<CpuType>({
  memoryCardList: [],
  cpuCardList: [],
})

export const addMemoryCardListByUserAtom = atom(null, (get, set, card: CardType, prevCard?: CardType) => {
  const currentMemoryCardList = get(cpuAtom).memoryCardList
  const currentMemoryCardListLength = currentMemoryCardList.length

  // userがペアカードの場合
  if (prevCard?.id === card.id) {
    const newMemoryCardList = currentMemoryCardList.filter((memoryCard) => {
      return memoryCard.id !== prevCard.id
    })
    set(cpuAtom, {
      ...get(cpuAtom),
      memoryCardList: newMemoryCardList,
    })
    return
  }

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
    return memoryCard.id !== card.id || memoryCard.status !== null
  })
  const newMemoryCardList = [...remainingMemoryCardList, card]
  set(cpuAtom, {
    ...get(cpuAtom),
    memoryCardList: newMemoryCardList,
  })
  return
})

export const resetMemoryCardListAtom = atom(null, (get, set) => {
  set(cpuAtom, {
    ...get(cpuAtom),
    memoryCardList: [],
  })
})

export const addMemoryCardListByCpuAtom = atom(null, (get, set, firstCard: CardType, secondCard: CardType) => {
  const currentMemoryCardList = get(cpuAtom).memoryCardList

  if (firstCard.id === secondCard.id) {
    const remainingCardList = currentMemoryCardList.filter((memoryCard) => {
      return (
        (memoryCard.id !== firstCard.id && memoryCard.mark !== firstCard.mark) ||
        (memoryCard.id !== secondCard.id && memoryCard.mark !== secondCard.mark)
      )
    })
    set(cpuAtom, {
      ...get(cpuAtom),
      memoryCardList: remainingCardList,
    })
    return
  }

  const newMemoryCardList = [...currentMemoryCardList, firstCard, secondCard]
  set(cpuAtom, {
    ...get(cpuAtom),
    memoryCardList: newMemoryCardList,
  })
})
