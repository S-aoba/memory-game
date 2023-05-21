import { BoardType } from '@/common/type'
import { atom } from 'jotai'

export const boardAtom = atom<BoardType>({
  isGameStart: false,
  currentTurn: 'player',
  winner: null,
})

export const startGameAtom = atom(null, (_, set) => {
  set(boardAtom, {
    isGameStart: true,
    currentTurn: 'player',
    winner: null,
  })
})
