import { useAtomValue, useSetAtom } from 'jotai'

import { boardAtom, changeIsFlipAtom, changeTurnAtom } from '@/atom/boardAtom'
import { userAtom } from '@/atom/userAtom'

import type { CardType } from '../type'
import { useTimer } from './useTimer'
import { useUser } from './useUser'

export const useUserTurn = ({ id, mark, status }: CardType) => {
  const isFlip = useAtomValue(boardAtom).isFlip

  const selectedCard = useAtomValue(userAtom).selectedCard

  const changeTurn = useSetAtom(changeTurnAtom)
  const changeIsFlip = useSetAtom(changeIsFlipAtom)

  const { userFirstTurn, userSecondTurn } = useUser()
  const { waitSeconds } = useTimer()

  const handleUserTurn = async () => {
    if (!isFlip) return

    // 1枚目のカードを取得
    if (!selectedCard) {
      const firstCard = { id, mark, status }
      userFirstTurn(firstCard)
      return
    }

    // 2枚目のカードを取得
    const secondCard = { id, mark, status }
    userSecondTurn(secondCard)
    changeIsFlip()
    await waitSeconds(2000)
    changeTurn()
    return
  }

  return { handleUserTurn }
}
