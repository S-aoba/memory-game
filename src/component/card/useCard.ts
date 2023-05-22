import { CardType } from '@/common/type'
import { useUser } from '../user/useUser'
import { useCpu } from '../cpu/useCpu'
import { useAtomValue, useSetAtom } from 'jotai'
import { boardAtom, changeBoardStatusOfIsFlipAtom } from '@/atom/boardAtom'

// atomの状態の変更に関してはboardAtom.tsを参照

export const useCard = (currentCard: CardType) => {
  const board = useAtomValue(boardAtom)
  const changeBoardStatusOfIsFlip = useSetAtom(changeBoardStatusOfIsFlipAtom)

  const { firstUserTurn, secondUserTurn } = useUser(currentCard)
  const { firstCpuTurn, secondCpuTurn } = useCpu()
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
