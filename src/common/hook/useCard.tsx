import { useAtomValue, useSetAtom } from 'jotai'

import {
  boardAtom,
  changeTurnAtom,
  setCardStatusToCloseAtom,
  setCardStatusToNullAtom,
  setCardStatusToOpenAtom,
} from '@/atom/boardAtom'
import { cpuAtom, setCpuCardListAtom } from '@/atom/cpuAtom'
import { setMemoryCardAtom, setSelectedCardAtom } from '@/atom/userAtom'

import type { CardType } from '../type'
import { useAudio } from './useAudio'
import { useTimer } from './useTimer'

export const useCard = () => {
  // boardAtom.ts
  const currentTurn = useAtomValue(boardAtom).currentTurn
  const gameMode = useAtomValue(boardAtom).mode
  const setCardStatusToOpen = useSetAtom(setCardStatusToOpenAtom)
  const setCardStatusToNull = useSetAtom(setCardStatusToNullAtom)
  const setCardStatusToClose = useSetAtom(setCardStatusToCloseAtom)
  const changeTurn = useSetAtom(changeTurnAtom)

  // cpuAtom.ts
  const setCpuCardList = useSetAtom(setCpuCardListAtom)
  const memoryCardList = useAtomValue(cpuAtom).memoryCardList

  // userAtom.ts
  const setMemoryCard = useSetAtom(setMemoryCardAtom)
  const setSelectedCard = useSetAtom(setSelectedCardAtom)

  const { flipAudio, setCardAudio } = useAudio()

  const { waitSeconds } = useTimer()

  const flipCard = (selectedCard: CardType) => {
    flipAudio.play() //何故かときどき音ズレが起きる
    setCardStatusToOpen(selectedCard)
    currentTurn === 'player' && setSelectedCard(selectedCard)
  }

  const checkIsExistCard = (targetCard: CardType) => {
    const isExist = memoryCardList.some((memoryCard: CardType) => {
      return targetCard.id === memoryCard.id && targetCard.mark === memoryCard.mark
    })
    return isExist
  }

  const findPairCardOfFirstCardInMemory = (firstCard: CardType) => {
    const isExist = memoryCardList.find((memoryCard: CardType) => {
      return memoryCard.id === firstCard.id && memoryCard.mark !== firstCard.mark
    })
    return isExist
  }

  const findPairCardInMemory = () => {
    // want to fix algorithm
    const pairCardList: CardType[] | undefined = []
    memoryCardList.filter((memoryCard: CardType) => {
      return memoryCardList.filter((targetCard: CardType) => {
        if (pairCardList.length >= 2) return
        if (memoryCard.id === targetCard.id && memoryCard.mark !== targetCard.mark) {
          pairCardList.push(memoryCard, targetCard)
        }
      })
    })
    return pairCardList
  }

  const removeFirstCardInCloseCardList = (closeCardList: CardType[], firstCard: CardType) => {
    return closeCardList.filter((card) => {
      return !(card.id === firstCard.id && card.mark === firstCard.mark)
    })
  }

  const filteredNotInMemory = (closeCardList: CardType[]) => {
    return closeCardList.filter((card: CardType) => {
      return !memoryCardList.some((memoryCard: CardType) => {
        return card.id === memoryCard.id && card.mark === memoryCard.mark
      })
    })
  }

  const checkPairCard = (firstCard: CardType, secondCard: CardType) => {
    return firstCard.id === secondCard.id && firstCard.mark !== secondCard.mark
  }

  const processCardPair = async (firstCard: CardType, secondCard: CardType) => {
    const isPair = checkPairCard(firstCard, secondCard)

    if (isPair) {
      // console.log("ランダムで選んだ2枚目がペアカードになったよ")
      setCardStatusToNull(firstCard, secondCard)
      setCardAudio.play()
      setCpuCardList(firstCard, secondCard)

      await waitSeconds(800)
      changeTurn()
    } else {
      // console.log("ランダムで選んだ2枚目がペアカードにならなかったよ")
      setCardStatusToClose(firstCard, secondCard)
      if (gameMode === 'normal' || gameMode === 'hard') {
        setMemoryCard(firstCard, secondCard)
      }

      await waitSeconds(800)
      changeTurn()
    }
  }

  const generateRandomCard = (cardList: CardType[]) => {
    const randomSecondCardIndex = Math.floor(Math.random() * cardList.length)
    const secondCard = cardList[randomSecondCardIndex]
    return secondCard
  }

  return {
    flipCard,
    checkPairCard,
    checkIsExistCard,
    findPairCardOfFirstCardInMemory,
    filteredNotInMemory,
    removeFirstCardInCloseCardList,
    processCardPair,
    generateRandomCard,
    findPairCardInMemory,
  }
}
