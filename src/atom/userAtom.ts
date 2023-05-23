import { CardType, UserType } from '@/common/type'
import { atom } from 'jotai'

export const userAtom = atom<UserType>({
  name: '',
  selectedCard: null,
  userCardList: [],
})

export const selectedUserCardAtom = atom(
  (get) => get(userAtom).selectedCard,
  (get, set, currentCard: CardType) => {
    set(userAtom, {
      ...get(userAtom),
      selectedCard: currentCard,
    })
  }
)
