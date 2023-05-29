import { useAtomValue } from 'jotai'

import { boardAtom } from '@/atom/boardAtom'

import type { CardType } from '../type'
import { useEasyMode } from './useEasyMode'

export const useUser = () => {
  const gameMode = useAtomValue(boardAtom).mode

  const { firstUserTurnEasyMode, secondUserTurnEasyMode } = useEasyMode()

  const userFirstTurn = (firstCard: CardType) => {
    if (gameMode === 'easy') {
      firstUserTurnEasyMode(firstCard)
      return
    } else if (gameMode === 'normal') {
      console.log('normal')
      return
    } else if (gameMode === 'hard') {
      console.log('hard')
      return
    }
    return
  }

  const userSecondTurn = (secondCard: CardType) => {
    if (gameMode === 'easy') {
      secondUserTurnEasyMode(secondCard)
      return
    } else if (gameMode === 'normal') {
      console.log('normal')
      return
    } else if (gameMode === 'hard') {
      console.log('hard')
      return
    }
  }
  return { userFirstTurn, userSecondTurn }
}
