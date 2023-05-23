import { changeCardStatusAtom, addCardToCpuCardListAtom, resetSelectedCardAtom, changeTurnAtom } from '@/atom/boardAtom'
import { generateCpuCardAtom, selectedCpuCardAtom } from '@/atom/cpuAtom'
import { useAudio } from '@/common/hook/useAudio'
import { CardType } from '@/common/type'
import { useAtom, useSetAtom } from 'jotai'

export const useCpu = () => {
  const { flipAudio, userGetCardAudio } = useAudio()

  const [cpuSelectionCard, selectCpuCard] = useAtom(selectedCpuCardAtom)
  const changeCardStatus = useSetAtom(changeCardStatusAtom)
  const addCardToCpuCardList = useSetAtom(addCardToCpuCardListAtom)
  const resetSelectedCard = useSetAtom(resetSelectedCardAtom)
  const changeTurn = useSetAtom(changeTurnAtom)
  const generateCpuCard = useSetAtom(generateCpuCardAtom)

  const flipCard = (firstCard: CardType) => {
    changeCardStatus(firstCard, { status: 'open' })
    flipAudio.play()
  }

  // cpu１回目のカード選択の処理関数
  const firstCpuTurn = async () => {
    const fistCpuCard = generateCpuCard()
    selectCpuCard(fistCpuCard)

    await new Promise((resolve) => setTimeout(resolve, 1000))
    flipCard(fistCpuCard)
  }

  // cpu２回目のカード選択の処理関数
  const secondCpuTurn = async () => {
    const secondCpuCard: CardType = { id: 1, mark: 'club', status: 'close' }

    await new Promise((resolve) => setTimeout(resolve, 1000))
    flipCard(secondCpuCard)

    await new Promise((resolve) => setTimeout(resolve, 1000))
    if (!cpuSelectionCard) return
    const isPair = cpuSelectionCard.id === secondCpuCard.id

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
