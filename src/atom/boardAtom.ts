import { atom } from 'jotai'

import { CARD_LIST_DATA } from '@/common/card-data'
import type { BoardType, CardType } from '@/common/type'

export const boardAtom = atom<BoardType>({
  mode: 'easy',
  isFlip: true,
  cardList: CARD_LIST_DATA,
  selectedCard: null,
  isGameStart: false,
  isFinish: false,
  currentTurn: 'player',
  winner: 'player',
})

export const startGameAtom = atom(null, (get, set, mode: 'easy' | 'normal' | 'hard') => {
  const currentBoard = get(boardAtom)
  const shuffleCardList = currentBoard.cardList.sort(() => {
    return Math.random() - 0.5
  })

  const newState = {
    ...currentBoard,
    mode,
    cardList: shuffleCardList,
    isGameStart: true,
  }
  set(boardAtom, newState)
})

export const changeTurnAtom = atom(null, (get, set) => {
  const currentTurn = get(boardAtom).currentTurn
  const isFlip = get(boardAtom).isFlip

  const nextTurn = currentTurn === 'player' ? 'cpu' : 'player'
  set(boardAtom, {
    ...get(boardAtom),
    isFlip: !isFlip,
    currentTurn: nextTurn,
  })
})

export const toggleIsFlipAtom = atom(null, (get, set) => {
  const isFlip = !get(boardAtom).isFlip
  set(boardAtom, {
    ...get(boardAtom),
    isFlip: isFlip,
  })
})

export const setCardStatusToOpenAtom = atom(null, (get, set, selectedCard: CardType) => {
  const currentCardList = get(boardAtom).cardList

  const newCardList = currentCardList.map((card: CardType) => {
    if (card.id === selectedCard.id && card.mark === selectedCard.mark) {
      return {
        ...card,
        status: 'open' as CardType['status'],
      }
    }
    return card
  })

  set(boardAtom, {
    ...get(boardAtom),
    cardList: newCardList,
  })
})

export const setCardStatusToNullAtom = atom(null, (get, set, firstCard: CardType, secondCard: CardType) => {
  const currentCardList = get(boardAtom).cardList

  const newCardList = currentCardList.map((card: CardType) => {
    if (
      (card.id === firstCard.id && card.mark === firstCard.mark) ||
      (card.id === secondCard.id && card.mark === secondCard.mark)
    ) {
      return {
        ...card,
        status: null as CardType['status'],
      }
    }
    return card
  })

  set(boardAtom, {
    ...get(boardAtom),
    cardList: newCardList,
  })
})

export const setCardStatusToCloseAtom = atom(null, (get, set, firstCard: CardType, secondCard: CardType) => {
  const currentCardList = get(boardAtom).cardList

  const newCardList = currentCardList.map((card: CardType) => {
    if (
      (card.id === firstCard.id && card.mark === firstCard.mark) ||
      (card.id === secondCard.id && card.mark === secondCard.mark)
    ) {
      return {
        ...card,
        status: 'close' as CardType['status'],
      }
    }
    return card
  })

  set(boardAtom, {
    ...get(boardAtom),
    cardList: newCardList,
  })
})
