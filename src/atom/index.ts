import { cardListData } from '@/common/card-data'
import { CardType } from '@/common/type'
import { atom } from 'jotai'

export const cardListAtom = atom<CardType[]>(cardListData)
export const toggleCardStatusAtom = atom(
  (get) => get(cardListAtom),
  (_, set, update: Omit<CardType, 'status'>) => {
    set(cardListAtom, (prev) => {
      prev.map((card) => {
        if (card.id === update.id && card.mark === update.mark) {
          card.status = card.status === 'open' ? 'close' : 'open'
        }
        return card
      })
      const newCardList = [...prev]
      return newCardList
    })
  }
)
