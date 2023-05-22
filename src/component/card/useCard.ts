import {
  addCardToCpuCardListAtom,
  addCardToUserCardListAtom,
  boardAtom,
  changeBoardStatusOfIsFlipAtom,
  changeCardStatusAtom,
  changeTurnAtom,
  resetSelectedCardAtom,
  selectCardAtom,
  selectCpuCardAtom,
} from '@/atom/boardAtom'
import { useAudio } from '@/common/hook/useAudio'
import { CardType } from '@/common/type'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'

// atomの状態の変更に関してはboardAtom.tsを参照

export const useCard = (currentCard: CardType) => {
  const { flipAudio, userGetCardAudio } = useAudio()

  const board = useAtomValue(boardAtom)
  const [selectedCard, select] = useAtom(selectCardAtom)
  const changeCardStatus = useSetAtom(changeCardStatusAtom)
  const changeBoardStatusOfIsFlip = useSetAtom(changeBoardStatusOfIsFlipAtom)
  const addCardToUserCardList = useSetAtom(addCardToUserCardListAtom)
  const addCardToCpuCardList = useSetAtom(addCardToCpuCardListAtom)
  const resetSelectedCard = useSetAtom(resetSelectedCardAtom)
  const changeTurn = useSetAtom(changeTurnAtom)
  const selectCpuCard = useSetAtom(selectCpuCardAtom)

  const flipCard = () => {
    changeCardStatus(currentCard, { status: 'open' })
    flipAudio.play()
  }

  // user１回目のカード選択の処理関数
  const firstUserTurn = async () => {
    select(currentCard)
    flipCard()
  }

  // user２回目のカード選択の処理関数
  const secondUserTurn = async () => {
    flipCard()
    await new Promise((resolve) => setTimeout(resolve, 1000))
    if (!selectedCard) return
    const isPair = selectedCard.id === currentCard.id
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

  // cpu１回目のカード選択の処理関数
  const firstCpuTurn = async () => {
    // CPU:1枚目のカードを選択
    const fistCpuCard = selectCpuCard()

    await new Promise((resolve) => setTimeout(resolve, 1000))
    select(fistCpuCard)
    changeCardStatus(fistCpuCard, { status: 'open' })
    flipAudio.play()
  }

  // cpu２回目のカード選択の処理関数
  const secondCpuTurn = async () => {
    const secondCpuCard = selectCpuCard()

    await new Promise((resolve) => setTimeout(resolve, 1000))
    changeCardStatus(secondCpuCard, { status: 'open' })
    flipAudio.play()

    await new Promise((resolve) => setTimeout(resolve, 1000))
    if (!selectedCard) return
    console.log(selectedCard, secondCpuCard)
    const isPair = selectedCard.id === secondCpuCard.id

    // ペアの場合
    if (isPair) {
      changeCardStatus(secondCpuCard, { status: null })
      addCardToCpuCardList(secondCpuCard)
      userGetCardAudio.play()

      await new Promise((resolve) => setTimeout(resolve, 1000))
      resetSelectedCard()
      changeTurn()
      return
    }
    // ペアではない場合
    changeCardStatus(secondCpuCard, { status: 'close' })

    await new Promise((resolve) => setTimeout(resolve, 1000))
    resetSelectedCard()
    changeTurn()
    return
  }
  // すべてのカードのstatusがnullになればゲーム終了のアラートを出す

  const handleTurn = async () => {
    if (!board.isFlip) return
    if (board.selectedCard === null) {
      // user１回目のカード選択
      await firstUserTurn()
      return
    }
    // user２回目のカード選択
    changeBoardStatusOfIsFlip()
    await secondUserTurn()

    // cpu１回目のカード選択
    await firstCpuTurn()
    // cpu２回目のカード選択
    await secondCpuTurn()
    changeBoardStatusOfIsFlip()

    // すべてのカードのstatusがnullになればゲーム終了のアラートを出す
  }
  return { handleTurn }
}
