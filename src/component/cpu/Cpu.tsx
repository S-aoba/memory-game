'use client'

import { useAtomValue, useSetAtom } from 'jotai'
import { useEffect } from 'react'

import { boardAtom, changeBoardStatusOfIsFlipAtom } from '@/atom/boardAtom'
import { cpuAtom } from '@/atom/cpuAtom'

import { HandCard } from '../card'
import { useCard } from '../card/useCard'
import { useCpu } from './useCpu'

/**
 * @package
 */

export const Cpu = () => {
  const board = useAtomValue(boardAtom)
  const cpu = useAtomValue(cpuAtom)
  const changeBoardStatusOfIsFlip = useSetAtom(changeBoardStatusOfIsFlipAtom)

  const { cpuTurn } = useCpu()
  const { checkIsGameOver, checkWinner } = useCard()

  useEffect(
    () => {
      if (board.currentTurn === 'cpu') {
        changeBoardStatusOfIsFlip()
        const isGameOver: boolean = checkIsGameOver()
        if (isGameOver) {
          const winner = checkWinner()
          alert(`${winner}`)
          return
        }
        cpuTurn()
        return () => {
          changeBoardStatusOfIsFlip()
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [board.currentTurn]
  )

  return (
    <div
      className={` h-full max-h-[800px] w-11/12 max-w-[600px] ${
        board.currentTurn === 'cpu' ? 'border-8 border-solid border-yellow-400' : 'border-8 border-solid'
      } `}
    >
      <div className=' flex h-1/4 w-full items-center justify-center border-b border-l-0 border-r-0 border-t-0 border-solid'>
        <p className=' text-5xl'>CPU</p>
      </div>
      <div className=' h-3/4 py-4'>
        {cpu.cpuCardList.length >= 1 ? (
          <div className=' grid h-full w-full grid-cols-4 gap-y-10'>
            {cpu.cpuCardList.map((card, index) => {
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
