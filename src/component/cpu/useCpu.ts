import { useAtomValue, useSetAtom } from 'jotai'

import { addCardToCpuCardListAtom, boardAtom, changeCardStatusByCpu, changeTurnAtom } from '@/atom/boardAtom'
import { useAudio } from '@/common/hook/useAudio'
import type { CardType } from '@/common/type'

export const useCpu = () => {
  const { flipAudio, userGetCardAudio } = useAudio()

  const board = useAtomValue(boardAtom)
  const changeCardStatus = useSetAtom(changeCardStatusByCpu)
  const addCardToCpuCardList = useSetAtom(addCardToCpuCardListAtom)
  const changeTurn = useSetAtom(changeTurnAtom)

  const flipCard = (card: CardType) => {
    changeCardStatus(card, { status: 'open' })
    flipAudio.play()
  }

  const generateCpuCard = () => {
    const cardList = board.cardList
    const availableFlipCardList = cardList.filter((card) => {
      return card.status === 'close'
    })

    const returnCpuCardList: CardType[] = []
    // 1枚目のカードの取得
    const firstCardIndex = Math.floor(Math.random() * availableFlipCardList.length)
    // availableFlipCardListのrandomFirstCardIndex番目のカードを取得
    const firstCard = availableFlipCardList[firstCardIndex]

    // ２枚めのカードの取得
    const remainingCardList = availableFlipCardList.filter((card) => {
      return card !== firstCard
    })

    const secondCardIndex = Math.floor(Math.random() * remainingCardList.length)
    const secondCard = remainingCardList[secondCardIndex]

    return [...returnCpuCardList, firstCard, secondCard]
  }

  const cpuTurn = async () => {
    const selectedCpuCard = generateCpuCard()

    const firstCpuCard = selectedCpuCard[0]
    const secondCpuCard = selectedCpuCard[1]

    await new Promise((resolve) => {
      return setTimeout(resolve, 1000)
    })
    flipCard(firstCpuCard)

    await new Promise((resolve) => {
      return setTimeout(resolve, 1000)
    })
    flipCard(secondCpuCard)

    await new Promise((resolve) => {
      return setTimeout(resolve, 1000)
    })

    const isPair = firstCpuCard.id === secondCpuCard.id

    // ペアの場合
    if (isPair) {
      changeCardStatus(firstCpuCard, { status: null })
      changeCardStatus(secondCpuCard, { status: null })

      addCardToCpuCardList(firstCpuCard, secondCpuCard)

      userGetCardAudio.play()

      await new Promise((resolve) => {
        return setTimeout(resolve, 1000)
      })
      changeTurn()
      return
    }
    // ペアではない場合
    changeCardStatus(firstCpuCard, { status: 'close' })
    changeCardStatus(secondCpuCard, { status: 'close' })

    await new Promise((resolve) => {
      return setTimeout(resolve, 1000)
    })
    changeTurn()
    return
  }

  return {
    cpuTurn,
  }
}
