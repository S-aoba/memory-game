import { CARD_LIST_DATA } from '@/common/card-data'
import { BoardType } from '@/common/type'
import { atom } from 'jotai'

export const boardAtom = atom<BoardType>({
  cardList: CARD_LIST_DATA,
  selectedCard: null,
  isGameStart: false,
  currentTurn: 'player',
  winner: null,
})

export const startGameAtom = atom(null, (_, set) => {
  set(boardAtom, {
    cardList: CARD_LIST_DATA,
    selectedCard: null,
    isGameStart: true,
    currentTurn: 'player',
    winner: null,
  })
})

export const changeTurnAtom = atom(null, (get, set) => {
  const currentTurn = get(boardAtom).currentTurn
  const nextTurn = currentTurn === 'player' ? 'cpu' : 'player'
  set(boardAtom, {
    ...get(boardAtom),
    currentTurn: nextTurn,
  })
})



