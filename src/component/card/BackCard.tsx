'use client'

import { CardType } from '@/common/type'
import { NextPage } from 'next'
import { useCard } from './useCard'

/**
 * @package
 */

export const BackCard: NextPage<CardType> = ({ id, mark, status }) => {
  const { handleUserTurn } = useCard({ id, mark, status })

  return (
    <>
      {status !== null ? (
        <div
          className='col-span-1 h-36 w-20 rounded-lg bg-white p-2 outline-yellow-300 hover:cursor-pointer hover:outline hover:outline-4 hover:outline-offset-4'
          onClick={handleUserTurn}
        >
          <div className='h-full w-full rounded-lg bg-slate-500'></div>
        </div>
      ) : (
        <div className='invisible col-span-1 h-36 w-20 rounded-lg bg-white p-2 outline-yellow-300 hover:cursor-pointer hover:outline hover:outline-4 hover:outline-offset-4'>
          <div className='h-full w-full rounded-lg bg-slate-500'></div>
        </div>
      )}
    </>
  )
}
