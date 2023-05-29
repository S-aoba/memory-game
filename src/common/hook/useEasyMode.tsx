import { useAtomValue, useSetAtom } from 'jotai'

import {
  boardAtom,
  changeTurnAtom,
  setCardStatusToCloseAtom,
  setCardStatusToNullAtom,
  setCardStatusToOpenAtom,
} from '@/atom/boardAtom'
import { cpuAtom, removeCardInMemoryAtom, resetMemoryAtom } from '@/atom/cpuAtom'
import {
  addSelectedCardAtom,
  checkIsNotPairCardInMemoryAtom,
  checkPairCardInMemoryAtom,
  resetSelectedCardAto,
  userAtom,
} from '@/atom/userAtom'

import type { CardType } from '../type'
import { useAudio } from './useAudio'
import { useTimer } from './useTimer'

export const useEasyMode = () => {
  const cardList = useAtomValue(boardAtom).cardList
  const memoryCardList = useAtomValue(cpuAtom).memoryCardList

  const selectedCard = useAtomValue(userAtom).selectedCard

  const addSelectedCard = useSetAtom(addSelectedCardAtom)
  const resetSelectedCard = useSetAtom(resetSelectedCardAto)
  const checkPairCardInMemory = useSetAtom(checkPairCardInMemoryAtom)
  const checkIsNotPairCardInMemory = useSetAtom(checkIsNotPairCardInMemoryAtom)

  const setCardStatusToOpen = useSetAtom(setCardStatusToOpenAtom)
  const setCardStatusToNull = useSetAtom(setCardStatusToNullAtom)
  const setCardStatusToClose = useSetAtom(setCardStatusToCloseAtom)

  const removeCardInMemory = useSetAtom(removeCardInMemoryAtom)
  const resetMemory = useSetAtom(resetMemoryAtom)

  const changeTurn = useSetAtom(changeTurnAtom)

  const { waitSeconds } = useTimer()

  const { flipAudio } = useAudio()

  const firstUserTurnEasyMode = (firstCard: CardType) => {
    flipAudio.play()
    setCardStatusToOpen(firstCard)
    addSelectedCard(firstCard)
  }

  const secondUserTurnEasyMode = async (secondCard: CardType) => {
    flipAudio.play()
    setCardStatusToOpen(secondCard)
    if (!selectedCard) return
    const isPair: boolean = selectedCard.id === secondCard.id && selectedCard.mark !== secondCard.mark

    if (isPair) {
      await waitSeconds(1200)
      setCardStatusToNull(selectedCard, secondCard)
      checkPairCardInMemory(secondCard)
      resetSelectedCard()
      return
    }

    await waitSeconds(1200)
    setCardStatusToClose(selectedCard, secondCard)
    checkIsNotPairCardInMemory(secondCard)
    resetSelectedCard()
    return
  }

  const cpuTurnEasyMode = async () => {
    const currentCardList = cardList.filter((card: CardType) => {
      return card.status === 'close'
    })

    const memoryCardListLength = memoryCardList.length
    if (memoryCardListLength === 0) {
      const randomFirstCardIndex = Math.floor(Math.random() * currentCardList.length)
      const firstCard = currentCardList[randomFirstCardIndex]
      await waitSeconds(1200)
      flipAudio.play()
      setCardStatusToOpen(firstCard)
      await waitSeconds(1000)
      changeTurn()
      return
    }
    const remainCardList = currentCardList.filter((card: CardType) => {
      return !memoryCardList.some((memoryCard: CardType) => {
        return card.id === memoryCard.id && card.mark === memoryCard.mark
      })
    })
    const randomFirstCardIndex = Math.floor(Math.random() * remainCardList.length)
    const firstCard = remainCardList[randomFirstCardIndex]
    await waitSeconds(1200)
    flipAudio.play()
    setCardStatusToOpen(firstCard)
    resetMemory()
    await waitSeconds(1000)
    changeTurn()
    return
  }

  return { firstUserTurnEasyMode, secondUserTurnEasyMode, cpuTurnEasyMode }
}
