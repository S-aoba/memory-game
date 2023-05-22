'use client'

import { useAtomValue } from 'jotai'
import { Card } from './Card'
import { boardAtom } from '@/atom/boardAtom'

export const CardList = () => {
  const board = useAtomValue(boardAtom)
  return (
    <>
      {board.isGameStart ? (
        <div className=' grid h-full w-full grid-cols-7 place-content-around place-items-center'>
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
