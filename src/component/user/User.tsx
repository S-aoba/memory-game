'use client'

import { userAtom } from '@/atom/userAtom'
import { UserCard } from '../card'
import { useAtomValue } from 'jotai'
import { boardAtom } from '@/atom/boardAtom'

/**
 * @package
 */

export const User = () => {
  const board = useAtomValue(boardAtom)

  const user = useAtomValue(userAtom)

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
        {user.cardList.length >= 1 ? (
          <div className=' grid h-full w-full grid-cols-4 gap-y-10'>
            {user.cardList.map((card, index) => {
              return <UserCard key={index} card={card} />
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
