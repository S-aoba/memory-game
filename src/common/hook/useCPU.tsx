import { useAtomValue } from 'jotai'

import { boardAtom } from '@/atom/boardAtom'

import { useEasyMode } from './useEasyMode'

export const useCpu = () => {
  const gameMode = useAtomValue(boardAtom).mode

  const { cpuTurnEasyMode } = useEasyMode()

  const cpuTurn = async () => {
    if (gameMode === 'easy') {
      cpuTurnEasyMode()
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
  return { cpuTurn }
}
