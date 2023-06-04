import { useAtomValue, useSetAtom } from 'jotai'

import { boardAtom, changeTurnAtom, setCardStatusToNullAtom } from '@/atom/boardAtom'
import { cpuAtom, resetMemoryAtom, setCpuCardListAtom } from '@/atom/cpuAtom'
import { removeMatchingCardAtom } from '@/atom/userAtom'

import type { CardType } from '../type'
import { useAudio } from './useAudio'
import { useCard } from './useCard'
import { useTimer } from './useTimer'

export const useCpu = () => {
  // boardAtom.ts
  const gameMode = useAtomValue(boardAtom).mode
  const cardList = useAtomValue(boardAtom).cardList
  const setCardStatusToNull = useSetAtom(setCardStatusToNullAtom)
  const changeTurn = useSetAtom(changeTurnAtom)

  // cpuAtom.ts
  const memoryCardList = useAtomValue(cpuAtom).memoryCardList
  const setCpuCardList = useSetAtom(setCpuCardListAtom)
  const resetMemory = useSetAtom(resetMemoryAtom)

  // userAtom.ts
  const removeMatchingCard = useSetAtom(removeMatchingCardAtom)

  const { waitSeconds } = useTimer()

  const {
    flipCard,
    findPairCardOfFirstCardInMemory,
    filteredNotInMemory,
    removeFirstCardInCloseCardList,
    processCardPair,
    generateRandomCard,
    findPairCardInMemory,
  } = useCard()

  const { setCardAudio } = useAudio()

  const firstTurn = (closeCardList: CardType[]) => {
    // console.log('Oops!, Pair Card is not in MemoryCardList')
    const remainCardList = filteredNotInMemory(closeCardList)
    // console.log('remain', remainCardList)
    const firstCard = generateRandomCard(remainCardList)
    flipCard(firstCard)
    return firstCard
  }

  const secondTurn = async (closeCardList: CardType[], firstCard: CardType) => {
    const nonFirstCardInCloseCardList = removeFirstCardInCloseCardList(closeCardList, firstCard)
    if (memoryCardList.length >= 1) {
      const isPairCard = findPairCardOfFirstCardInMemory(firstCard)
      if (isPairCard) {
        // console.log('ランダムで選んだ1枚目とペアになるカードがmemoryCardListからあったよ')
        const secondCard = isPairCard
        await waitSeconds(800)
        flipCard(secondCard)

        await waitSeconds(800)
        setCardStatusToNull(firstCard, secondCard)
        setCardAudio?.play()
        setCpuCardList(firstCard, secondCard)
        removeMatchingCard(firstCard, secondCard)

        await waitSeconds(800)
        changeTurn()
        gameMode === 'easy' && resetMemory()
        return
      }
      // console.log('ランダムで選んだ1枚目とペアになるカードがmemoryCardListなかった残念泣')
      const remainCardList = filteredNotInMemory(nonFirstCardInCloseCardList)
      const secondCard = generateRandomCard(remainCardList)
      await waitSeconds(1000)
      flipCard(secondCard)
      // firstCard, secondCard 比較
      await waitSeconds(1000)
      processCardPair(firstCard, secondCard)
      gameMode === 'easy' && resetMemory()
      return
    }
    // memoryCardListLength === 0
    await waitSeconds(1000)
    const secondCard = generateRandomCard(nonFirstCardInCloseCardList)
    flipCard(secondCard)

    await waitSeconds(1000)
    processCardPair(firstCard, secondCard)
    gameMode === 'easy' && resetMemory()
    return
  }

  const cpuTurn = async () => {
    // FirstCpuTurn
    const closeCardList = cardList.filter((card) => {
      return card.status === 'close'
    })
    await waitSeconds(1000)

    const pairCardInMemory = findPairCardInMemory()
    if (pairCardInMemory.length >= 1) {
      // console.log('excellent! Pair Card is in MemoryCardList', pairCardInMemory[0], pairCardInMemory[1])
      await waitSeconds(800)
      const firstCard = pairCardInMemory[0]
      flipCard(firstCard)

      await waitSeconds(800)
      const secondCard = pairCardInMemory[1]
      flipCard(secondCard)

      await waitSeconds(800)
      setCardStatusToNull(firstCard, secondCard)
      setCardAudio?.play()
      setCpuCardList(firstCard, secondCard)
      removeMatchingCard(firstCard, secondCard)
      changeTurn()
      return
    }
    const firstCard = firstTurn(closeCardList)

    // SecondCpuTurn
    secondTurn(closeCardList, firstCard)
  }
  return { cpuTurn }
}
