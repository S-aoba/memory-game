import { useAtomValue } from 'jotai'

import { boardAtom } from '@/atom/boardAtom'

import { useEasyMode } from './useEasyMode'
import { useNormalMode } from './useNormalMode'

export const useCpu = () => {
  const gameMode = useAtomValue(boardAtom).mode

  const { cpuTurnEasyMode } = useEasyMode()
  const { cpuTurnNormalMode } = useNormalMode()

  const cpuTurn = async () => {
    if (gameMode === 'easy') {
      cpuTurnEasyMode()
      return
    } else if (gameMode === 'normal') {
      cpuTurnNormalMode()
      return
    } else if (gameMode === 'hard') {
      console.log('hard')
      return
    }
    return
  }
  return { cpuTurn }
}
