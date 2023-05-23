import {
  changeCardStatusAtom,
  resetSelectedCardAtom,
  changeTurnAtom,
  addCardToUserCardListAtom,
} from '@/atom/boardAtom'
import { selectedUserCardAtom } from '@/atom/userAtom'
import { useAudio } from '@/common/hook/useAudio'
import { CardType } from '@/common/type'
import { useAtom, useSetAtom } from 'jotai'

export const useUser = (currentCard: CardType) => {
  const { flipAudio, userGetCardAudio } = useAudio()

  const [userSelectionCard, selectUserCard] = useAtom(selectedUserCardAtom)
  const changeCardStatus = useSetAtom(changeCardStatusAtom)
  const addCardToUserCardList = useSetAtom(addCardToUserCardListAtom)
  const resetSelectedCard = useSetAtom(resetSelectedCardAtom)
  const changeTurn = useSetAtom(changeTurnAtom)

  const flipCard = () => {
    changeCardStatus(currentCard, { status: 'open' })
    flipAudio.play()
  }

  // user１回目のカード選択の処理関数
  const firstUserTurn = async () => {
    selectUserCard(currentCard)
    flipCard()
  }

  // user２回目のカード選択の処理関数
  const secondUserTurn = async () => {
    flipCard()

    await new Promise((resolve) => setTimeout(resolve, 1000))

    if (!userSelectionCard) return

    const isPair = userSelectionCard.id === currentCard.id

    // ペアの場合
    if (isPair) {
      changeCardStatus(currentCard, { status: null })
      addCardToUserCardList(currentCard)
      userGetCardAudio.play()

      await new Promise((resolve) => setTimeout(resolve, 1000))
      resetSelectedCard()
      changeTurn()
      return
    }

    // ペアではない場合
    changeCardStatus(currentCard, { status: 'close' })
    await new Promise((resolve) => setTimeout(resolve, 1000))
    resetSelectedCard()
    changeTurn()
  }

  return {
    firstUserTurn,
    secondUserTurn,
    userSelectionCard,
  }
}
