import { atom } from 'jotai'

import type { CardType, UserType } from '@/common/type'

import { cpuAtom } from './cpuAtom'

export const userAtom = atom<UserType>({
  name: '',
  selectedCard: null,
  userCardList: [],
})

export const setSelectedCardAtom = atom(null, (get, set, firstCard: CardType) => {
  set(userAtom, {
    ...get(userAtom),
    selectedCard: firstCard,
  })
})

export const setUserCardListAtom = atom(null, (get, set, firstCard: CardType, secondCard: CardType) => {
  const newUserCardList = {
    first: firstCard,
    second: secondCard,
  }
  set(userAtom, {
    ...get(userAtom),
    userCardList: [...get(userAtom).userCardList, newUserCardList],
  })
})

export const setMemoryCardAtom = atom(null, (get, set, firstCard: CardType, secondCard: CardType) => {
  const newMemoryCardList = [...get(cpuAtom).memoryCardList, firstCard, secondCard]
  set(cpuAtom, {
    ...get(cpuAtom),
    memoryCardList: newMemoryCardList,
  })
})

export const removeMatchingCardAtom = atom(null, (get, set, firstCard: CardType, secondCard: CardType) => {
  const newMemoryCardList = get(cpuAtom).memoryCardList.filter((card: CardType) => {
    return card !== firstCard && card !== secondCard
  })
  set(cpuAtom, {
    ...get(cpuAtom),
    memoryCardList: newMemoryCardList,
  })
})

export const resetSelectedCardAtom = atom(null, (get, set) => {
  set(userAtom, {
    ...get(userAtom),
    selectedCard: null,
  })
})
