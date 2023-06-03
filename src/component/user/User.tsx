'use client'

import { useAtomValue } from 'jotai'
import { useEffect } from 'react'

import { boardAtom } from '@/atom/boardAtom'
import { userAtom } from '@/atom/userAtom'
import { useCard } from '@/common/hook/useCard'

import { HandCard } from '../card'

/**
 * @package
 */

export const User = () => {
  const board = useAtomValue(boardAtom)
  const user = useAtomValue(userAtom)

  const { checkIsGameOver, checkWinner } = useCard()

  useEffect(
    () => {
      if (board.currentTurn === 'player') {
        const isGameOver: boolean = checkIsGameOver()

        if (isGameOver) {
          const winner = checkWinner()
          alert(`${winner}`)
          return
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [board.currentTurn]
  )

  return (
    <div
      className={` h-full max-h-[800px] w-11/12 max-w-[600px] ${
        board.currentTurn === 'player' ? 'border-8 border-solid border-yellow-400' : 'border-8 border-solid'
      } `}
    >
      <div className=' flex h-1/4 w-full items-center justify-center border-b border-l-0 border-r-0 border-t-0 border-solid'>
        <p className=' text-5xl'>Your</p>
      </div>
      <div className=' h-3/4 py-4'>
        {user.userCardList.length >= 1 ? (
          <div className=' grid h-full w-full grid-cols-4 gap-y-10'>
            {user.userCardList.map((card, index) => {
              return <HandCard key={index} card={card} />
            })}
          </div>
        ) : (
          <div className='flex h-full w-full items-center justify-center'>
            <p className=' text-xl'>手持ちはありません</p>
          </div>
        )}
      </div>
    </div>
  )
}
