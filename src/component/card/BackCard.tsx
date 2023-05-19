'use client'

import { toggleCardStatusAtom } from '@/atom'
import { CardType } from '@/common/type'
import { useSetAtom } from 'jotai'
import { NextPage } from 'next'

/**
 * @package
 */

export const BackCard: NextPage<Omit<CardType, 'status'>> = ({ id, mark }) => {
  const toggleCardStatus = useSetAtom(toggleCardStatusAtom)
  const handleToggle = () => {
    toggleCardStatus({ id, mark })
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
