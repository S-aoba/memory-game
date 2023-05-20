import { CARD_LIST_DATA } from '@/common/card-data'
import { CardType } from '@/common/type'
import { Status } from '@/common/type/type'
import { atom } from 'jotai'
import { userCardListAtom } from './userAtom'

export const cardListAtom = atom<CardType[]>(CARD_LIST_DATA)
export const selectedCardListAtom = atom<CardType[]>([])

//  カードを裏返す処理
export const flipCardAtom = atom(null, (get, set, selectCard: CardType) => {
  const newCardList = get(cardListAtom).map((card) => {
    if (card.id === selectCard.id && card.mark === selectCard.mark) {
      return {
        ...card,
        // 疑問:ここはこの書き方でいいのか？ as Status
        status: 'open' as Status,
      }
    }
    return card
  })
  set(cardListAtom, newCardList)
})

// カードを選択したときの処理
export const addSelectedCardListAtom = atom(null, (get, set, selectedCard: CardType) => {
  const currentSelectedCardList = get(selectedCardListAtom)
  const newSelectedCardList = [...currentSelectedCardList, selectedCard]
  set(selectedCardListAtom, newSelectedCardList)
})

export const checkIsPairAtom = atom(null, (get, set, selectedCard: CardType) => {
  const currentSelectedCardList = get(selectedCardListAtom)
  const isPear = currentSelectedCardList.some((card) => {
    return card.id === selectedCard.id
  })
  return isPear
})

export const resetSelectedCardListAtom = atom(null, (_, set) => {
  set(selectedCardListAtom, [])
})
export const resetCardListAtom = atom(null, (get, set) => {
  setTimeout(() => {
    const newCardList = get(cardListAtom).map((card) => {
      if (card.status === 'open') {
        return {
          ...card,
          status: 'close' as Status,
        }
      }
      return card
    })
    set(cardListAtom, newCardList)
  }, 1000)
})

export const hideCardAtom = atom(null, (get, set, selectedCard: CardType) => {
  setTimeout(() => {
    const currentSelectedCardList = get(selectedCardListAtom)
    const firstCard = currentSelectedCardList[0]
    const secondCard = selectedCard
    const newCardList = get(cardListAtom).map((prevCard) => {
      if (
        (prevCard.id === secondCard.id && prevCard.mark === secondCard.mark) ||
        (prevCard.id === firstCard.id && prevCard.mark === firstCard.mark)
      ) {
        return {
          ...prevCard,
          status: null,
        }
      }
      return prevCard
    })
    set(cardListAtom, newCardList)
  }, 1000)
})

export const addUserCardListAtom = atom(null, (get, set, selectedCard: CardType) => {
  const currentUserCardList = get(userCardListAtom)
  const currentSelectedCardList = get(selectedCardListAtom)
  set(userCardListAtom, [...currentUserCardList, [currentSelectedCardList[0], selectedCard]])
})
