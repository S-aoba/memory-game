import { useAtomValue, useSetAtom } from 'jotai'

import { boardAtom, changeBoardStatusOfIsFlipAtom, setWinnerAtom } from '@/atom/boardAtom'
import { cpuAtom } from '@/atom/cpuAtom'
import { userAtom } from '@/atom/userAtom'
import type { CardType } from '@/common/type'

import { useUser } from '../user/useUser'

// atomの状態の変更に関してはboardAtom.tsを参照

export const useCard = () => {
  const board = useAtomValue(boardAtom)

  const user = useAtomValue(userAtom)
  const cpu = useAtomValue(cpuAtom)
  const setWinner = useSetAtom(setWinnerAtom)
  const changeBoardStatusOfIsFlip = useSetAtom(changeBoardStatusOfIsFlipAtom)

  const { firstUserTurn, secondUserTurn, userSelectionCard } = useUser()

  const handleUserTurn = async (currentCard: CardType) => {
    if (!board.isFlip) return

    if (userSelectionCard === null) {
      // user１回目のカード選択
      await firstUserTurn(currentCard)
      return
    }
    // user２回目のカード選択
    changeBoardStatusOfIsFlip()
    await secondUserTurn(currentCard)
    changeBoardStatusOfIsFlip()
  }

  const checkIsGameOver = (): boolean => {
    const currentCardList = board.cardList
    const isGameOver = currentCardList.every((card) => {
      return card.status === null
    })
    return isGameOver
  }

  const checkWinner = (): 'drawとなりました' | '勝者はcpuです' | '勝者はplayerです' => {
    setWinner()
    const userCardLength = user.userCardList.length
    const cpuCardLength = cpu.cpuCardList.length

    if (userCardLength < cpuCardLength) {
      return '勝者はcpuです'
    } else if (userCardLength > cpuCardLength) {
      return '勝者はplayerです'
    }
    return 'drawとなりました'
  }

  return { handleUserTurn, checkIsGameOver, checkWinner }
}
