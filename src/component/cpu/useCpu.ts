import {
  changeCardStatusAtom,
  addCardToCpuCardListAtom,
  changeTurnAtom,
  boardAtom,
  setWinnerAtom,
} from '@/atom/boardAtom'
import { cpuAtom, generateCpuCardAtom } from '@/atom/cpuAtom'
import { userAtom } from '@/atom/userAtom'
import { useAudio } from '@/common/hook/useAudio'
import { CardType } from '@/common/type'
import { useAtomValue, useSetAtom } from 'jotai'

export const useCpu = () => {
  const { flipAudio, userGetCardAudio } = useAudio()

  const changeCardStatus = useSetAtom(changeCardStatusAtom)
  const addCardToCpuCardList = useSetAtom(addCardToCpuCardListAtom)
  const changeTurn = useSetAtom(changeTurnAtom)
  const generateCpuCard = useSetAtom(generateCpuCardAtom)
  const board = useAtomValue(boardAtom)
  const user = useAtomValue(userAtom)
  const cpu = useAtomValue(cpuAtom)
  const setWinner = useSetAtom(setWinnerAtom)

  const flipCard = (firstCard: CardType) => {
    changeCardStatus(firstCard, { status: 'open' })
    flipAudio.play()
  }

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
  // User.tsx, Cpu.tsxがboard.currentTurnが変更されるたびにレンダリングので、そのたびにBoard.cardListのすべてのstatusがnull出ないかを判定する関数
  const checkIsGameOver = (): boolean => {
    const currentCardList = board.cardList
    const isGameOver = currentCardList.every((card) => card.status === null)
    return isGameOver
  }

  const checkWinner = (): 'draw' | 'cpu' | 'player' => {
    setWinner()
    const userCardLength = user.userCardList.length
    const cpuCardLength = cpu.cpuCardList.length

    if (userCardLength < cpuCardLength) {
      return 'cpu'
    } else if (userCardLength > cpuCardLength) {
      return 'player'
    }
    return 'draw'
  }

  return {
    cpuTurn,
    checkIsGameOver,
    checkWinner,
  }
}
