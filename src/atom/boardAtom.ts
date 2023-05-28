import { atom } from 'jotai'

import { CARD_LIST_DATA } from '@/common/card-data'
import type { BoardType } from '@/common/type'

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
  const nextTurn = currentTurn === 'player' ? 'cpu' : 'player'
  set(boardAtom, {
    ...get(boardAtom),
    currentTurn: nextTurn,
  })
})
