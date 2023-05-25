import { useAtom, useSetAtom } from 'jotai'

import { addCardToUserCardListAtom, changeCardStatusAtom, changeTurnAtom } from '@/atom/boardAtom'
import { selectedUserCardAtom } from '@/atom/userAtom'
import { useAudio } from '@/common/hook/useAudio'
import type { CardType } from '@/common/type'

export const useUser = () => {
  const { flipAudio, userGetCardAudio } = useAudio()

  const [userSelectionCard, selectUserCard] = useAtom(selectedUserCardAtom)
  const changeCardStatus = useSetAtom(changeCardStatusAtom)
  const addCardToUserCardList = useSetAtom(addCardToUserCardListAtom)
  const changeTurn = useSetAtom(changeTurnAtom)

  const flipCard = (currentCard: CardType) => {
    changeCardStatus(currentCard, { status: 'open' })
    flipAudio.play()
  }

  // user１回目のカード選択の処理関数
  const firstUserTurn = async (currentCard: CardType) => {
    selectUserCard(currentCard)
    flipCard(currentCard)
  }

  // user２回目のカード選択の処理関数
  const secondUserTurn = async (currentCard: CardType) => {
    flipCard(currentCard)

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
      return
    }

    // ペアではない場合
    changeCardStatus(currentCard, { status: 'close' })
    await new Promise((resolve) => {
      return setTimeout(resolve, 1000)
    })
    changeTurn()
  }

  return {
    firstUserTurn,
    secondUserTurn,
    userSelectionCard,
  }
}
