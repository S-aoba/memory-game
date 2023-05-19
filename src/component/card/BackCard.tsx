'use client'

import { CardType } from '@/common/type'
import { NextPage } from 'next'

/**
 * @package
 */

export const BackCard: NextPage<Pick<CardType, 'id'>> = ({ id }) => {
  const handleToggle = () => {}
  return (
    <div
      className='hover: col-span-1 h-36 w-20 rounded-lg bg-white p-2 outline-yellow-300 hover:cursor-pointer hover:outline hover:outline-4 hover:outline-offset-4'
      onClick={handleToggle}
    >
      <div className='h-full w-full rounded-lg bg-slate-500'></div>
    </div>
  )
}
