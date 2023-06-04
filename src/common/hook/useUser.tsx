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
    // console.log('selectedCard', selectedCard)
    flipCard(firstCard)
    return
  }

  const userSecondTurn = async (secondCard: CardType) => {
    flipAudio?.play()
    setCardStatusToOpen(secondCard)

    await waitSeconds(800)
    if (!selectedCard) return
    const isPairCard = checkPairCard(selectedCard, secondCard)

    if (isPairCard) {
      // console.log('やったね！ペアだったよ')
      setCardStatusToNull(selectedCard, secondCard)
      setUserCardList(selectedCard, secondCard)
      setCardAudio?.play()
      if (
        (memoryCardList.length >= 1 && gameMode === 'normal') ||
        (memoryCardList.length >= 1 && gameMode === 'hard')
      ) {
        removeMatchingCard(selectedCard, secondCard) //期待通りの動きしてる
      }
      resetSelectedCard()
      return
    }
    // console.log('Pairではなかったよ')
    setCardStatusToClose(selectedCard, secondCard)
    if ((memoryCardList.length === 0 && gameMode === 'easy') || (memoryCardList.length === 0 && gameMode === 'hard')) {
      setMemoryCard(selectedCard, secondCard)
      resetSelectedCard()
      return
    } else if (memoryCardList.length >= 1 && gameMode === 'hard') {
      const isExistFirstCard = checkIsExistCard(selectedCard)
      const isExistSecondCard = checkIsExistCard(secondCard)

      if (isExistFirstCard && isExistSecondCard) {
        resetSelectedCard()
        return
      } else if (!isExistFirstCard && !isExistSecondCard) {
        setMemoryCard(selectedCard, secondCard)
      } else if (isExistFirstCard && !isExistSecondCard) {
        setMemoryCard(secondCard)
      } else {
        setMemoryCard(selectedCard)
      }
      resetSelectedCard()
      return
    }
    resetSelectedCard()
    return
  }
  return { userFirstTurn, userSecondTurn }
}
