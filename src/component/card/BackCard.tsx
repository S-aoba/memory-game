'use client'

import type { NextPage } from 'next'

import { useUserTurn } from '@/common/hook/useUserTurn'
import type { CardType } from '@/common/type'

/**
 * @package
 */

export const BackCard: NextPage<CardType> = ({ id, mark, status }) => {
  const { handleUserTurn } = useUserTurn({ id, mark, status })

  return (
    <>
      {status !== null ? (
        <button
          onClick={handleUserTurn}
          type='button'
          className='col-span-1 h-36 w-20 rounded-lg bg-white p-2 hover:cursor-pointer hover:outline hover:outline-4 hover:outline-offset-4 hover:outline-yellow-300'
        >
          <div className='h-full w-full rounded-lg bg-slate-500'></div>
        </button>
      ) : (
        <div className='invisible col-span-1 h-36 w-20 rounded-lg bg-white p-2 hover:cursor-pointer hover:outline hover:outline-4 hover:outline-offset-4 hover:outline-yellow-300'>
          <div className='h-full w-full rounded-lg bg-slate-500'></div>
        </div>
      )}
    </>
  )
}
