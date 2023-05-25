import { useAtom, useAtomValue, useSetAtom } from 'jotai'

import {
  addCardToUserCardListAtom,
  boardAtom,
  changeBoardStatusOfIsFlipAtom,
  changeCardStatusAtom,
  changeTurnAtom,
} from '@/atom/boardAtom'
import { addMemoryCardListByUserAtom } from '@/atom/cpuAtom'
import { selectedUserCardAtom } from '@/atom/userAtom'
import { useAudio } from '@/common/hook/useAudio'
import type { CardType } from '@/common/type'

export const useUser = (currentCard: CardType) => {
  const { flipAudio, userGetCardAudio } = useAudio()

  const board = useAtomValue(boardAtom)
  const [userSelectionCard, selectUserCard] = useAtom(selectedUserCardAtom)
  const changeCardStatus = useSetAtom(changeCardStatusAtom)
  const addCardToUserCardList = useSetAtom(addCardToUserCardListAtom)
  const changeTurn = useSetAtom(changeTurnAtom)
  const changeBoardStatusOfIsFlip = useSetAtom(changeBoardStatusOfIsFlipAtom)
  const addMemoryCardList = useSetAtom(addMemoryCardListByUserAtom)

  const flipCard = () => {
    changeCardStatus(currentCard, { status: 'open' })
    flipAudio.play()
  }

  // user１回目のカード選択の処理関数
  const firstUserTurn = async () => {
    selectUserCard(currentCard)
    flipCard()
    addMemoryCardList(currentCard)
  }

  // user２回目のカード選択の処理関数
  const secondUserTurn = async () => {
    flipCard()

    await new Promise((resolve) => {
      return setTimeout(resolve, 1000)
    })

    if (!userSelectionCard) return

    const isPair = userSelectionCard.id === currentCard.id

    // ペアの場合
    if (isPair) {
      changeCardStatus(currentCard, { status: null })
      addCardToUserCardList(currentCard)
      userGetCardAudio.play()

      await new Promise((resolve) => {
        return setTimeout(resolve, 1000)
      })
      changeTurn()
      addMemoryCardList(currentCard, userSelectionCard)

      return
    }

    // ペアではない場合
    changeCardStatus(currentCard, { status: 'close' })
    await new Promise((resolve) => {
      return setTimeout(resolve, 1000)
    })
    changeTurn()
    addMemoryCardList(currentCard)
  }

  const handleUserTurn = async () => {
    if (!board.isFlip) return

    if (userSelectionCard === null) {
      // user１回目のカード選択
      await firstUserTurn()
      return
    }
    // user２回目のカード選択
    changeBoardStatusOfIsFlip()
    await secondUserTurn()
    changeBoardStatusOfIsFlip()
  }

  return {
    firstUserTurn,
    secondUserTurn,
    userSelectionCard,
    handleUserTurn,
  }
}
