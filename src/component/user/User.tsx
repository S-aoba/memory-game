'use client'

import { userCardListAtom } from '@/atom/userAtom'
import { UserCard } from '../card'
import { useAtomValue } from 'jotai'

/**
 * @package
 */

export const User = () => {
  const userCardList = useAtomValue(userCardListAtom)

  return (
    <div className=' h-full max-h-[800px] w-11/12 max-w-[600px] border border-solid'>
      <div className=' flex h-1/4 w-full items-center justify-center border-b border-l-0 border-r-0 border-t-0 border-solid'>
        <p className=' text-5xl'>Your</p>
      </div>
      <div className=' h-3/4 py-4'>
        {userCardList.length >= 1 ? (
          <div className=' grid h-full w-full grid-cols-4 gap-y-10'>
            {userCardList.map((card, index) => {
              return <UserCard key={index} card={card } />
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
