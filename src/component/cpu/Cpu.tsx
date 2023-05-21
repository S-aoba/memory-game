'use client'

import { boardAtom } from '@/atom/boardAtom'
import { useAtomValue } from 'jotai'

/**
 * @package
 */

export const Cpu = () => {
  const board = useAtomValue(boardAtom)

  return (
    <div
      className={` h-full max-h-[800px] w-11/12 max-w-[600px] ${
        board.currentTurn === 'cpu' ? 'border-8 border-solid border-yellow-400' : 'border-8 border-solid'
      } `}
    >
      <div className=' flex h-1/4 w-full items-center justify-center'>
        <p className=' text-5xl'>CPU</p>
      </div>
      <div className=' h-3/4 bg-blue-500'>
        <span>Hello</span>
      </div>
    </div>
  )
}
