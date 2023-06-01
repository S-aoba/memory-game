import { useAtomValue, useSetAtom } from 'jotai'

import { boardAtom, setCardStatusToCloseAtom, setCardStatusToNullAtom, setCardStatusToOpenAtom } from '@/atom/boardAtom'
import { cpuAtom } from '@/atom/cpuAtom'
import {
  removeMatchingCardAtom,
  resetSelectedCardAtom,
  setMemoryCardAtom,
  setUserCardListAtom,
  userAtom,
} from '@/atom/userAtom'

import type { CardType } from '../type'
import { useAudio } from './useAudio'
import { useCard } from './useCard'
import { useTimer } from './useTimer'

export const useUser = () => {
  // boardAtom.ts
  const gameMode = useAtomValue(boardAtom).mode
  const setCardStatusToOpen = useSetAtom(setCardStatusToOpenAtom)
  const setCardStatusToNull = useSetAtom(setCardStatusToNullAtom)
  const setCardStatusToClose = useSetAtom(setCardStatusToCloseAtom)

  // cpuAtom.ts
  const memoryCardList = useAtomValue(cpuAtom).memoryCardList

  // userAtom.ts
  const selectedCard = useAtomValue(userAtom).selectedCard
  const setUserCardList = useSetAtom(setUserCardListAtom)
  const setMemoryCard = useSetAtom(setMemoryCardAtom)
  const removeMatchingCard = useSetAtom(removeMatchingCardAtom)
  const resetSelectedCard = useSetAtom(resetSelectedCardAtom)

  const { flipAudio, setCardAudio } = useAudio()

  const { waitSeconds } = useTimer()

  const { flipCard, checkPairCard, checkIsExistCard } = useCard()

  const userFirstTurn = (firstCard: CardType) => {
    flipCard(firstCard)
    return
  }

  const userSecondTurn = async (secondCard: CardType) => {
    flipAudio.play()
    setCardStatusToOpen(secondCard)

    await waitSeconds(800)
    if (!selectedCard) return
    const isPairCard = checkPairCard(selectedCard, secondCard)

    if (isPairCard) {
      setCardStatusToNull(selectedCard, secondCard)
      setUserCardList(selectedCard, secondCard)
      setCardAudio.play()
      if ((memoryCardList.length >= 1 && gameMode === 'normal') || gameMode === 'hard') {
        removeMatchingCard(selectedCard, secondCard)
      }
      resetSelectedCard()
      return
    }
    setCardStatusToClose(selectedCard, secondCard)
    if ((memoryCardList.length === 0 && gameMode === 'easy') || (memoryCardList.length === 0 && gameMode === 'hard')) {
      setMemoryCard(selectedCard, secondCard)
    } else if (memoryCardList.length >= 1 && gameMode === 'hard') {
      const isExistCard = checkIsExistCard(selectedCard, secondCard)
      if (isExistCard) return
      setMemoryCard(selectedCard, secondCard)
    }
    resetSelectedCard()
    return
  }
  return { userFirstTurn, userSecondTurn }
}
