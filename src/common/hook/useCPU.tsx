import { useAtomValue } from 'jotai'

import { boardAtom } from '@/atom/boardAtom'

import { useEasyMode } from './useEasyMode'
import { useHardMode } from './useHardMode'
import { useNormalMode } from './useNormalMode'

export const useCpu = () => {
  const gameMode = useAtomValue(boardAtom).mode

  const { cpuTurnEasyMode } = useEasyMode()
  const { cpuTurnNormalMode } = useNormalMode()
  const { cpuTurnHardMode } = useHardMode()

  const cpuTurn = async () => {
    if (gameMode === 'easy') {
      cpuTurnEasyMode()
      return
    } else if (gameMode === 'normal') {
      cpuTurnNormalMode()
      return
    } else if (gameMode === 'hard') {
      cpuTurnHardMode()
      return
    }
    return
  }
  return { cpuTurn }
}
