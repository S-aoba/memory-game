import { useAtomValue, useSetAtom } from 'jotai'

import {
  boardAtom,
  changeTurnAtom,
  setCardStatusToCloseAtom,
  setCardStatusToNullAtom,
  setCardStatusToOpenAtom,
} from '@/atom/boardAtom'
import { addCpuCardListAtom, cpuAtom, removeCardInMemoryAtom, resetMemoryAtom } from '@/atom/cpuAtom'
import {
  addSelectedCardAtom,
  addUserCardListAtom,
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
  const addUserCardList = useSetAtom(addUserCardListAtom)

  const setCardStatusToOpen = useSetAtom(setCardStatusToOpenAtom)
  const setCardStatusToNull = useSetAtom(setCardStatusToNullAtom)
  const setCardStatusToClose = useSetAtom(setCardStatusToCloseAtom)

  const removeCardInMemory = useSetAtom(removeCardInMemoryAtom)
  const resetMemory = useSetAtom(resetMemoryAtom)
  const addCpuCardList = useSetAtom(addCpuCardListAtom)

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
      addUserCardList(selectedCard, secondCard)
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

    // FirstCard(memoryCardList === 0)
    if (memoryCardListLength === 0) {
      const randomFirstCardIndex = Math.floor(Math.random() * currentCardList.length)
      const firstCard = currentCardList[randomFirstCardIndex]
      await waitSeconds(1200)
      flipAudio.play()
      setCardStatusToOpen(firstCard)

      // 2枚目のカードを取得(memoryCardList === 0)
      const remainCardList = currentCardList.filter((card: CardType) => {
        return card !== firstCard
      })
      const randomSecondCardIndex = Math.floor(Math.random() * remainCardList.length)
      const secondCard = remainCardList[randomSecondCardIndex]
      if (firstCard.id === secondCard.id) {
        await waitSeconds(1200)
        flipAudio.play()
        setCardStatusToOpen(secondCard)

        // カートクローズ
        await waitSeconds(1200)
        setCardStatusToNull(firstCard, secondCard)
        addCpuCardList(firstCard, secondCard)

        resetMemory()
        await waitSeconds(1200)
        changeTurn()
        return
      }

      //カードオープン
      await waitSeconds(1200)
      flipAudio.play()
      setCardStatusToOpen(secondCard)

      // カートクローズ
      await waitSeconds(1200)
      setCardStatusToClose(firstCard, secondCard)

      // ターンチェンジ
      await waitSeconds(1200)
      changeTurn()
      return
    }

    // FirstCard(memoryCardList > 0)
    const removeDuplicationFirstCardList = currentCardList.filter((card: CardType) => {
      return !memoryCardList.some((memoryCard: CardType) => {
        return card.id === memoryCard.id && card.mark === memoryCard.mark
      })
    })
    const randomFirstCardIndex = Math.floor(Math.random() * removeDuplicationFirstCardList.length)
    const firstCard = removeDuplicationFirstCardList[randomFirstCardIndex]
    await waitSeconds(1200)
    flipAudio.play()
    setCardStatusToOpen(firstCard)

    // 2枚目のカードを取得(memoryCardList > 0)
    const isPairInMemory = memoryCardList.find((memoryCard: CardType) => {
      return memoryCard.id === firstCard.id && memoryCard.mark !== firstCard.mark
    })

    if (isPairInMemory) {
      await waitSeconds(1200)
      flipAudio.play()
      setCardStatusToOpen(isPairInMemory)

      await waitSeconds(1200)
      setCardStatusToNull(firstCard, isPairInMemory)
      addCpuCardList(firstCard, isPairInMemory)

      removeCardInMemory(firstCard)
      resetMemory()
      await waitSeconds(1200)
      changeTurn()
      return
    }
    const remainCardList = currentCardList.filter((card: CardType) => {
      return card !== firstCard
    })

    const removeDuplicationSecondCardList = remainCardList.filter((card: CardType) => {
      return !memoryCardList.some((memoryCard: CardType) => {
        return card === memoryCard
      })
    })

    const randomSecondCardIndex = Math.floor(Math.random() * removeDuplicationSecondCardList.length)
    const secondCard = removeDuplicationSecondCardList[randomSecondCardIndex]

    if (firstCard.id === secondCard.id) {
      await waitSeconds(1200)
      flipAudio.play()
      setCardStatusToOpen(secondCard)

      // カートクローズ
      await waitSeconds(1200)
      setCardStatusToNull(firstCard, secondCard)
      addCpuCardList(firstCard, secondCard)

      resetMemory()
      await waitSeconds(1200)
      changeTurn()
      return
    }

    // カードオープン
    await waitSeconds(1200)
    flipAudio.play()
    setCardStatusToOpen(secondCard)

    // カートクローズ
    await waitSeconds(1200)
    setCardStatusToClose(firstCard, secondCard)

    resetMemory()
    await waitSeconds(1200)
    changeTurn()
    return
  }

  return { firstUserTurnEasyMode, secondUserTurnEasyMode, cpuTurnEasyMode }
}
