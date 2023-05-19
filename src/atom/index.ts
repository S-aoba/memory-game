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
          // 一度開いたものは閉じれない
          card.status = 'open'
        }
        return card
      })
      const newCardList = [...prev]
      return newCardList
    })
  }
)

export const deleteCardListAtom = atom(null, (_, set, target1: CardType, target2: CardType) => {
  set(cardListAtom, (prev) => {
    // target1とtarget2のidが一致した場合にはnullを入れる
    prev.map((card) => {
      if (
        (card.id === target1.id && card.mark === target1.mark) ||
        (card.id === target2.id && card.mark === target2.mark)
      ) {
        card.status = null
      }
      return card
    })
    const newCardList = [...prev]
    return newCardList
  })
})

export const resetCardListAtom = atom(null, (_, set, target1: number, target2: number) => {
  set(cardListAtom, (prev) => {
    prev.map((card) => {
      if (card.id === target1 || card.id === target2) {
        card.status = 'close'
      }
      return card
    })
    const newCardList = [...prev]
    return newCardList
  })
})

export const selectedCardListAtom = atom<CardType[]>([])

export const checkSelectedCardListAtom = atom(
  (get) => get(selectedCardListAtom),
  (get, set, update: CardType) => {
    // selectedCardListに存在してなければ追加し、存在していればtrueを返す
    const selectedCardList = get(selectedCardListAtom)
    const isExist = selectedCardList.some((card) => card.id === update.id)
    if (!isExist) {
      const newCardList = [...selectedCardList, update]
      set(selectedCardListAtom, newCardList)
      return false
    }
    return true
  }
)

export const resetSelectedCardListAtom = atom(null, (_, set) => {
  set(selectedCardListAtom, [])
})
