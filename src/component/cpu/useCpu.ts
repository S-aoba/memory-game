import { changeCardStatusAtom, addCardToCpuCardListAtom, resetSelectedCardAtom, changeTurnAtom } from '@/atom/boardAtom'
import { generateCpuCardAtom } from '@/atom/cpuAtom'
import { useAudio } from '@/common/hook/useAudio'
import { CardType } from '@/common/type'
import { useSetAtom } from 'jotai'

export const useCpu = () => {
  const { flipAudio, userGetCardAudio } = useAudio()

  const changeCardStatus = useSetAtom(changeCardStatusAtom)
  const addCardToCpuCardList = useSetAtom(addCardToCpuCardListAtom)
  const resetSelectedCard = useSetAtom(resetSelectedCardAtom)
  const changeTurn = useSetAtom(changeTurnAtom)
  const generateCpuCard = useSetAtom(generateCpuCardAtom)

  const flipCard = (firstCard: CardType) => {
    changeCardStatus(firstCard, { status: 'open' })
    flipAudio.play()
  }

  // cpu２回目のカード選択の処理関数
  const cpuTurn = async () => {
    const firstCpuCard = generateCpuCard()

    await new Promise((resolve) => setTimeout(resolve, 1000))
    flipCard(firstCpuCard)

    const secondCpuCard: CardType = generateCpuCard()

    await new Promise((resolve) => setTimeout(resolve, 1000))
    flipCard(secondCpuCard)

    await new Promise((resolve) => setTimeout(resolve, 1000))

    const isPair = firstCpuCard.id === secondCpuCard.id

    // ペアの場合
    if (isPair) {

      changeCardStatus(firstCpuCard, { status: null })
      changeCardStatus(secondCpuCard, { status: null })

      addCardToCpuCardList(firstCpuCard, secondCpuCard)

      userGetCardAudio.play()

      await new Promise((resolve) => setTimeout(resolve, 1000))
      resetSelectedCard()
      changeTurn()
      return
    }
    // ペアではない場合
    changeCardStatus(firstCpuCard, { status: 'close' })
    changeCardStatus(secondCpuCard, { status: 'close' })

    await new Promise((resolve) => setTimeout(resolve, 1000))
    changeTurn()
    return
  }

  return {
    cpuTurn,
  }
}
