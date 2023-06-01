import { useAtomValue, useSetAtom } from 'jotai'

import { boardAtom, changeTurnAtom, setCardStatusToNullAtom } from '@/atom/boardAtom'
import { cpuAtom, resetMemoryAtom, setCpuCardListAtom } from '@/atom/cpuAtom'

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

  const { waitSeconds } = useTimer()

  const {
    flipCard,
    checkIsPairCardInMemory,
    filteredNotInMemory,
    removeFirstCardInCloseCardList,
    processCardPair,
    generateRandomSecondCard,
  } = useCard()

  const { setCardAudio } = useAudio()

  const cpuTurn = async () => {
    // FirstCpuTurn
    const closeCardList = cardList.filter((card) => {
      return card.status === 'close'
    })
    let remainCardList = closeCardList
    if (memoryCardList.length >= 1) {
      remainCardList = filteredNotInMemory(closeCardList)
    }
    const randomFirstCardIndex = Math.floor(Math.random() * remainCardList.length)
    const firstCard = remainCardList[randomFirstCardIndex]
    await waitSeconds(1000)
    flipCard(firstCard)

    // SecondCpuTurn
    const nonFirstCardInCloseCardList = removeFirstCardInCloseCardList(closeCardList, firstCard)
    if (memoryCardList.length >= 1) {
      const isPairCard = checkIsPairCardInMemory(firstCard)
      if (isPairCard) {
        const secondCard = isPairCard
        await waitSeconds(800)
        flipCard(secondCard)

        await waitSeconds(800)
        setCardStatusToNull(firstCard, secondCard)
        setCardAudio.play()
        setCpuCardList(firstCard, secondCard)

        await waitSeconds(800)
        changeTurn()
        gameMode === 'easy' && resetMemory()
        return
      }
      const secondCard = generateRandomSecondCard(nonFirstCardInCloseCardList)
      await waitSeconds(1000)
      flipCard(secondCard)
      // firstCard, secondCard 比較
      await waitSeconds(1000)
      processCardPair(firstCard, secondCard)
      gameMode === 'easy' && resetMemory()
      return
    }
    const secondCard = generateRandomSecondCard(nonFirstCardInCloseCardList)
    await waitSeconds(1000)
    flipCard(secondCard)
    // firstCard, secondCard 比較
    await waitSeconds(1000)
    processCardPair(firstCard, secondCard)
    gameMode === 'easy' && resetMemory()
    return
  }
  return { cpuTurn }
}
