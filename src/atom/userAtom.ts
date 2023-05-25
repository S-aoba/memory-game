import { atom } from 'jotai'

import type { CardType, UserType } from '@/common/type'

export const userAtom = atom<UserType>({
  name: '',
  selectedCard: null,
  userCardList: [],
})

export const selectedUserCardAtom = atom(
  (get) => {
    return get(userAtom).selectedCard
  },
  (get, set, currentCard: CardType) => {
    set(userAtom, {
      ...get(userAtom),
      selectedCard: currentCard,
    })
  }
)

export const resetUserSelectedCard = atom(null, (get, set) => {
  set(userAtom, {
    ...get(userAtom),
    selectedCard: null,
  })
})
