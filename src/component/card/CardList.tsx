'use client'

import { useAtomValue } from 'jotai'

import { boardAtom } from '@/atom/boardAtom'

import { Card } from './Card'

export const CardList = () => {
  const board = useAtomValue(boardAtom)
  return (
    <>
      {board.isGameStart ? (
        <div className=' grid h-full w-full grid-cols-5 place-content-around place-items-center'>
          {board.cardList.map((card, index) => {
            return <Card key={index} id={card.id} mark={card.mark} status={card.status} />
          })}
        </div>
      ) : (
        <p>まだ試合は始まっていません</p>
      )}
    </>
  )
}
