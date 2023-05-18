'use client'

import { NextPage } from 'next'
import { Dispatch, SetStateAction } from 'react'

/**
 * @package
 */
type CardProps = {
  toggleIsFront: Dispatch<SetStateAction<boolean>>
}

export const BackCard: NextPage<CardProps> = ({ toggleIsFront }) => {
  const handleToggle = () => {
    toggleIsFront(true)
  }
  return (
    <div
      className='hover: col-span-1 h-36 w-20 rounded-lg bg-white p-2 outline-yellow-300 hover:cursor-pointer hover:outline hover:outline-4 hover:outline-offset-4'
      onClick={handleToggle}
    >
      <div className='h-full w-full rounded-lg bg-slate-500'></div>
    </div>
  )
}
