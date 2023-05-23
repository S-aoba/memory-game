import {
  selectCardAtom,
  changeCardStatusAtom,
  addCardToCpuCardListAtom,
  resetSelectedCardAtom,
  changeTurnAtom,
  selectCpuCardAtom,
} from '@/atom/boardAtom'
import { useAudio } from '@/common/hook/useAudio'
import { CardType } from '@/common/type'
import { useAtom, useSetAtom } from 'jotai'

export const useCpu = () => {
  const { flipAudio, userGetCardAudio } = useAudio()

  const [selectedCard, select] = useAtom(selectCardAtom)
  const changeCardStatus = useSetAtom(changeCardStatusAtom)
  const addCardToCpuCardList = useSetAtom(addCardToCpuCardListAtom)
  const resetSelectedCard = useSetAtom(resetSelectedCardAtom)
  const changeTurn = useSetAtom(changeTurnAtom)
  const selectCpuCard = useSetAtom(selectCpuCardAtom)

  // cpu１回目のカード選択の処理関数
  const firstCpuTurn = async () => {
    // CPU:1枚目のカードを選択
    const fistCpuCard = selectCpuCard()
    select(fistCpuCard)

    await new Promise((resolve) => setTimeout(resolve, 1000))
    changeCardStatus(fistCpuCard, { status: 'open' })
    flipAudio.play()
  }

  // cpu２回目のカード選択の処理関数
  const secondCpuTurn = async () => {
    const secondCpuCard: CardType = { id: 1, mark: 'club', status: 'close' }

    await new Promise((resolve) => setTimeout(resolve, 1000))
    changeCardStatus(secondCpuCard, { status: 'open' })
    flipAudio.play()

    await new Promise((resolve) => setTimeout(resolve, 1000))
    if (!selectedCard) return

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

  return {
    firstCpuTurn,
    secondCpuTurn,
  }
}
