'use client'

import { flipCardAtom, selectAndCheckCardAtom } from '@/atom/cardAtom'
import { CardType } from '@/common/type'
import { useSetAtom } from 'jotai'
import { NextPage } from 'next'

/**
 * @package
 */

export const BackCard: NextPage<CardType> = ({ id, mark, status }) => {
  const flipCard = useSetAtom(flipCardAtom)
  const selectAndCheckCardList = useSetAtom(selectAndCheckCardAtom)

  const handleOnClick = () => {
    const card: CardType = { id, mark, status }
    flipCard(card)
    selectAndCheckCardList(card)
  }
  return (
    <>
      {status !== null ? (
        <div
          className='col-span-1 h-36 w-20 rounded-lg bg-white p-2 outline-yellow-300 hover:cursor-pointer hover:outline hover:outline-4 hover:outline-offset-4'
          onClick={handleOnClick}
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
