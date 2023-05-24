import { CardType } from '@/common/type'
import { useUser } from '../user/useUser'
import { useAtomValue, useSetAtom } from 'jotai'
import { boardAtom, changeBoardStatusOfIsFlipAtom } from '@/atom/boardAtom'

// atomの状態の変更に関してはboardAtom.tsを参照

export const useCard = (currentCard: CardType) => {
  const board = useAtomValue(boardAtom)

  const changeBoardStatusOfIsFlip = useSetAtom(changeBoardStatusOfIsFlipAtom)

  const { firstUserTurn, secondUserTurn, userSelectionCard } = useUser()

  const handleUserTurn = async () => {
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

  return { handleUserTurn }
}
