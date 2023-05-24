import { CardType } from '@/common/type'
import { useUser } from '../user/useUser'
import { useCpu } from '../cpu/useCpu'
import { useAtomValue, useSetAtom } from 'jotai'
import { boardAtom, changeBoardStatusOfIsFlipAtom } from '@/atom/boardAtom'

// atomの状態の変更に関してはboardAtom.tsを参照

export const useCard = (currentCard: CardType) => {
  const board = useAtomValue(boardAtom)

  const changeBoardStatusOfIsFlip = useSetAtom(changeBoardStatusOfIsFlipAtom)

  const { firstUserTurn, secondUserTurn, userSelectionCard } = useUser(currentCard)
  const { cpuTurn } = useCpu()

  const handleTurn = async () => {
    if (!board.isFlip) return

    if (userSelectionCard === null) {
      // user１回目のカード選択
      await firstUserTurn()
      return
    }
    // user２回目のカード選択
    changeBoardStatusOfIsFlip()
    await secondUserTurn()
    
    if(board.isFinish) return

    // cpuのターン
    await cpuTurn()
    changeBoardStatusOfIsFlip()
  }
  return { handleTurn }
}
