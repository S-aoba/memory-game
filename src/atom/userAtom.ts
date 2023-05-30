import { atom } from 'jotai'

import type { CardType, UserType } from '@/common/type'

import { cpuAtom } from './cpuAtom'

export const userAtom = atom<UserType>({
  name: '',
  selectedCard: null,
  userCardList: [],
})

export const addSelectedCardAtom = atom(null, (get, set, firstCard: CardType) => {
  set(userAtom, {
    ...get(userAtom),
    selectedCard: firstCard,
  })
})

export const resetSelectedCardAto = atom(null, (get, set) => {
  set(userAtom, {
    ...get(userAtom),
    selectedCard: null,
  })
})

export const checkPairCardInMemoryAtom = atom(null, (get, set, secondCard: CardType) => {
  const firstCard = get(userAtom).selectedCard
  const memoryCardList = get(cpuAtom).memoryCardList
  const memoryCardListLength = memoryCardList.length

  // easyModeの場合は、memoryCardListが空の状態でしかないので必ずここで終了
  if (memoryCardListLength === 0 || !firstCard) return

  const isExistCard = memoryCardList.some((memoryCard: CardType) => {
    return (
      (memoryCard.id !== firstCard.id && memoryCard.mark !== firstCard.mark) ||
      (memoryCard.id !== secondCard.id && memoryCard.mark !== secondCard.mark)
    )
  })

  if (!isExistCard) return
  const removeCardList = memoryCardList.filter((memoryCard: CardType) => {
    return (
      (memoryCard.id !== firstCard.id && memoryCard.mark !== firstCard.mark) ||
      (memoryCard.id !== secondCard.id && memoryCard.mark !== secondCard.mark)
    )
  })
  set(cpuAtom, {
    ...get(cpuAtom),
    memoryCardList: removeCardList,
  })
})

export const checkIsNotPairCardInMemoryAtom = atom(null, (get, set, secondCard: CardType) => {
  const firstCard = get(userAtom).selectedCard
  const memoryCardList = get(cpuAtom).memoryCardList
  const memoryCardListLength = memoryCardList.length

  if (!firstCard) return

  if (memoryCardListLength === 0) {
    const newMemoryCard = [...memoryCardList, firstCard, secondCard]
    set(cpuAtom, {
      ...get(cpuAtom),
      memoryCardList: newMemoryCard,
    })
  }

  const isFirstCardExistCard = memoryCardList.some((memoryCard: CardType) => {
    return memoryCard.id === firstCard.id && memoryCard.mark === firstCard.mark
  })

  if (isFirstCardExistCard) return
  set(cpuAtom, {
    ...get(cpuAtom),
    memoryCardList: [...memoryCardList, firstCard],
  })

  const isSecondCardExistCard = memoryCardList.some((memoryCard: CardType) => {
    return memoryCard.id === secondCard.id && memoryCard.mark === secondCard.mark
  })

  if (isSecondCardExistCard) return
  set(cpuAtom, {
    ...get(cpuAtom),
    memoryCardList: [...memoryCardList, secondCard],
  })
})

export const addUserCardListAtom = atom(null, (get, set, firstCard: CardType, secondCard: CardType) => {
  const newCpuCardList = {
    first: firstCard,
    second: secondCard,
  }
  set(userAtom, {
    ...get(userAtom),
    userCardList: [...get(userAtom).userCardList, newCpuCardList],
  })
})
