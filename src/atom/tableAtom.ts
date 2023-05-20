import { BoardType } from '@/common/type'
import { atom } from 'jotai'

export const boardAtom = atom<BoardType>({
  currentTurn: 'player',
  winner: null,
})
