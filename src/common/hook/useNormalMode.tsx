import { useAtomValue, useSetAtom } from 'jotai'

import { setCardStatusToCloseAtom, setCardStatusToNullAtom, setCardStatusToOpenAtom } from '@/atom/boardAtom'
import { setMemoryCardInEasyModeAtom, setUserCardListAtom, userAtom } from '@/atom/userAtom'

import type { CardType } from '../type'
import { useAudio } from './useAudio'
import { useCard } from './useCard'
import { useTimer } from './useTimer'

export const useNormalMode = () => {
  // boardAtom.ts
  const setCardStatusToOpen = useSetAtom(setCardStatusToOpenAtom)
  const setCardStatusToNull = useSetAtom(setCardStatusToNullAtom)
  const setCardStatusToClose = useSetAtom(setCardStatusToCloseAtom)

  // 音関係
  const { setCardAudio } = useAudio()

  // Timer
  const { waitSeconds } = useTimer()

  // useCard.ts
  const {} = useCard()

  const cpuTurnNormalMode = async () => {
    return
  }
  return { cpuTurnNormalMode }
}
