import { useAtomValue, useSetAtom } from 'jotai'

import { addCardToCpuCardListAtom, boardAtom, changeCardStatusByCpu, changeTurnAtom } from '@/atom/boardAtom'
import { addMemoryCardListByCpuAtom, cpuAtom, resetMemoryCardListAtom } from '@/atom/cpuAtom'
import { useAudio } from '@/common/hook/useAudio'
import type { CardType } from '@/common/type'

export const useCpu = () => {
  const { flipAudio, userGetCardAudio } = useAudio()

  const board = useAtomValue(boardAtom)
  const cpu = useAtomValue(cpuAtom)
  const changeCardStatus = useSetAtom(changeCardStatusByCpu)
  const addCardToCpuCardList = useSetAtom(addCardToCpuCardListAtom)
  const changeTurn = useSetAtom(changeTurnAtom)
  const resetMemoryCardList = useSetAtom(resetMemoryCardListAtom)
  const addMemoryCardListByCpu = useSetAtom(addMemoryCardListByCpuAtom)

  const easyMode = (): CardType[] => {
    const cardList = board.cardList

    // cardのstatus がcloseであると同時にmemoryCardListに存在していないカードのリストの取得 todo:リファクタリング必要
    const availableFlipCardList = cardList.filter((card) => {
      return (
        card.status === 'close' &&
        !cpu.memoryCardList.some((memoryCard) => {
          return memoryCard.id === card.id && memoryCard.mark === card.mark
        })
      )
    })

    // 1枚目のカードの取得
    const firstCardIndex = Math.floor(Math.random() * availableFlipCardList.length)
    // availableFlipCardListのrandomFirstCardIndex番目のカードを取得
    const firstCard = availableFlipCardList[firstCardIndex]

    // ２枚めのカードの取得
    const remainingCardList = availableFlipCardList.filter((card) => {
      return card !== firstCard
    })

    // memoryCardListの中身を探索して1枚目のカードと同じIDかつ異なるマーク(例: ♡1 ♧1)があるかないかを判定する
    const currentMemoryCardList = cpu.memoryCardList
    const secondCard = currentMemoryCardList.find((card) => {
      return card.id === firstCard.id && card.mark !== firstCard.mark
    })

    // memoryCardListの中になければ、ランダムで2枚目を開く
    if (!secondCard) {
      const secondCardIndex = Math.floor(Math.random() * remainingCardList.length)
      const secondCard = remainingCardList[secondCardIndex]
      resetMemoryCardList()
      return [firstCard, secondCard]
    }
    resetMemoryCardList()
    return [firstCard, secondCard]
  }

  const normalMode = (): CardType[] => {
    const cardList = board.cardList

    // cardListの中でnullでないカードを取得かつmemoryCardListの中に存在していないカードを取得する
    const availableFlipCardList = cardList.filter((card) => {
      return (
        card.status === 'close' &&
        !cpu.memoryCardList.some((memoryCard) => {
          return memoryCard.id === card.id && memoryCard.mark === card.mark
        })
      )
    })

    // 1枚目のカードの取得
    const firstCardIndex = Math.floor(Math.random() * availableFlipCardList.length)
    // availableFlipCardListのrandomFirstCardIndex番目のカードを取得
    const firstCard = availableFlipCardList[firstCardIndex]

    // ２枚めのカードの取得
    const remainingCardList = availableFlipCardList.filter((card) => {
      return card !== firstCard
    })

    // memoryCardListの中身を探索して1枚目のカードと同じIDかつ異なるマーク(例: ♡1 ♧1)があるかないかを判定する
    const currentMemoryCardList = cpu.memoryCardList
    const secondCard = currentMemoryCardList.find((card) => {
      return card.id === firstCard.id && card.mark !== firstCard.mark
    })

    // memoryCardListの中になければ、ランダムで2枚目を開く
    if (!secondCard) {
      const secondCardIndex = Math.floor(Math.random() * remainingCardList.length)
      const secondCard = remainingCardList[secondCardIndex]
      addMemoryCardListByCpu(firstCard, secondCard)
      return [firstCard, secondCard]
    }
    addMemoryCardListByCpu(firstCard, secondCard)
    return [firstCard, secondCard]
  }

  const hardMode = (): CardType[] => {
    return []
  }

  const flipCard = (card: CardType) => {
    changeCardStatus(card, { status: 'open' })
    flipAudio.play()
  }

  const selectCpuCard = () => {
    if (board.mode === 'easy') return easyMode()
    else if (board.mode === 'normal') return normalMode()
    return hardMode()
  }

  const cpuTurn = async () => {
    const cpuCardList = selectCpuCard()

    const firstCpuCard = cpuCardList[0]
    const secondCpuCard = cpuCardList[1]

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
