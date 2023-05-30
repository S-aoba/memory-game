import { useSetAtom } from 'jotai'

import { setCardStatusToOpenAtom } from '@/atom/boardAtom'
import { addSelectedCardAtom } from '@/atom/userAtom'

import type { CardType } from '../type'
import { useAudio } from './useAudio'

export const useNormalMode = () => {
  const addSelectedCard = useSetAtom(addSelectedCardAtom)

  const setCardStatusToOpen = useSetAtom(setCardStatusToOpenAtom)

  const { flipAudio } = useAudio()

  const firstUserTurnNormalMode = (firstCard: CardType) => {
    flipAudio.play()
    setCardStatusToOpen(firstCard)
    addSelectedCard(firstCard)
  }
  const secondUserTurnNormalMode = (secondCard: CardType) => {
    return
  }
  return { firstUserTurnNormalMode, secondUserTurnNormalMode }
}
