import { useSetAtom } from 'jotai'

import { setCardStatusToCloseAtom, setCardStatusToNullAtom, setCardStatusToOpenAtom } from '@/atom/boardAtom'
import { addCpuCardListAtom, addMemoryAtom, removeCardInMemoryAtom } from '@/atom/cpuAtom'

import type { CardType } from '../type'
import { useAudio } from './useAudio'

export const useCard = () => {
  const setCardStatusToOpen = useSetAtom(setCardStatusToOpenAtom)
  const setCardStatusToNull = useSetAtom(setCardStatusToNullAtom)
  const setCardStatusToClose = useSetAtom(setCardStatusToCloseAtom)

  const addCpuCardList = useSetAtom(addCpuCardListAtom)
  const addMemory = useSetAtom(addMemoryAtom)
  const removeCardInMemory = useSetAtom(removeCardInMemoryAtom)

  const { flipAudio, getCardAudio } = useAudio()

  const flipOpenCard = (card: CardType) => {
    flipAudio.play()
    setCardStatusToOpen(card)
  }

  const generateRandomCard = (cardList: CardType[]) => {
    const randomCardIndex = Math.floor(Math.random() * cardList.length)
    return cardList[randomCardIndex]
  }

  const isPair = (firstCard: CardType, secondCard: CardType) => {
    setCardStatusToNull(firstCard, secondCard)
    addCpuCardList(firstCard, secondCard)
    removeCardInMemory(secondCard)
    getCardAudio.play()
  }

  const isNotPair = (firstCard: CardType, secondCard: CardType) => {
    setCardStatusToClose(firstCard, secondCard)
    addMemory(firstCard, secondCard)
  }

  const filterCardList = (closeOnlyCardList: CardType[], memoryCardList: CardType[]) => {
    return closeOnlyCardList.filter((card: CardType) => {
      return !memoryCardList.some((memoryCard: CardType) => {
        return memoryCard.id === card.id && memoryCard.mark === card.mark && memoryCard.status === card.status
      })
    })
  }

  return { flipOpenCard, generateRandomCard, isPair, isNotPair, filterCardList }
}
