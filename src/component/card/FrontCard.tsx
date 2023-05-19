'use client'

import { CardType } from '@/common/type'
import { IconClubs, IconDiamond, IconHeart, IconSpade } from '@tabler/icons-react'
import { NextPage } from 'next'

/**
 * @package
 */

export const FrontCard: NextPage<Omit<CardType, 'status'>> = ({ id, mark }) => {
  const handleToggle = () => {}
  return (
    <div
      className='hover: col-span-1 h-36 w-20 rounded-lg bg-white p-2 outline-yellow-300 hover:cursor-pointer hover:outline hover:outline-4 hover:outline-offset-4'
      onClick={handleToggle}
    >
      <div className='flex h-full w-full flex-col'>
        <div className=' flex justify-start'>
          {mark === 'hart' ? <span className='text-xl text-red-500'>{id}</span> : <span className='text-xl'>{id}</span>}
        </div>
        <div className='flex h-full items-center justify-center'>
          {mark === 'hart' && <IconHeart size={50} fill='red' color='red' />}
          {mark === 'spade' && <IconSpade size={50} fill='black' />}
          {mark === 'diamond' && <IconDiamond size={50} fill='white' />}
          {mark === 'club' && <IconClubs size={50} fill='black' />}
        </div>
        <div className=' flex justify-end'>
          {mark === 'hart' ? <span className='text-xl text-red-500'>{id}</span> : <span className='text-xl'>{id}</span>}
        </div>
      </div>
    </div>
  )
}
