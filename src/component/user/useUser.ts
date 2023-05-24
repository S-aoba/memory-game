import { changeCardStatusAtom, changeTurnAtom, addCardToUserCardListAtom, boardAtom } from '@/atom/boardAtom'
import { selectedUserCardAtom } from '@/atom/userAtom'
import { useAudio } from '@/common/hook/useAudio'
import { CardType } from '@/common/type'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'

export const useUser = () => {
  const { flipAudio, userGetCardAudio } = useAudio()

  const [userSelectionCard, selectUserCard] = useAtom(selectedUserCardAtom)
  const changeCardStatus = useSetAtom(changeCardStatusAtom)
  const addCardToUserCardList = useSetAtom(addCardToUserCardListAtom)
  const changeTurn = useSetAtom(changeTurnAtom)
  const board = useAtomValue(boardAtom)


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

    await new Promise((resolve) => setTimeout(resolve, 1000))

    if (!userSelectionCard) return

    const isPair = userSelectionCard.id === currentCard.id

    // ペアの場合
    if (isPair) {
      changeCardStatus(currentCard, { status: null })
      addCardToUserCardList(currentCard)
      userGetCardAudio.play()

      await new Promise((resolve) => setTimeout(resolve, 1000))
      changeTurn()
      return
    }

    // ペアではない場合
    changeCardStatus(currentCard, { status: 'close' })
    await new Promise((resolve) => setTimeout(resolve, 1000))
    changeTurn()
  }

  // User.tsx, Cpu.tsxがboard.currentTurnが変更されるたびにレンダリングので、そのたびにBoard.cardListのすべてのstatusがnull出ないかを判定する関数
  const checkIsGameOver = (): boolean => {
    const currentCardList = board.cardList
    const isGameOver = currentCardList.every((card) => card.status === null)
    return isGameOver
  }

  return {
    firstUserTurn,
    secondUserTurn,
    userSelectionCard,
    checkIsGameOver,
  }
}
