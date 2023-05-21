'use client'

import { useAtomValue } from 'jotai'
import { Card } from './Card'
import { cardListAtom } from '@/atom/cardAtom'
import { boardAtom } from '@/atom/tableAtom'

export const CardList = () => {
  const board = useAtomValue(boardAtom)
  const cardList = useAtomValue(cardListAtom)
  return (
    <>
      {board.isGameStart ? (
        <div className=' grid h-full w-full grid-cols-7 place-content-around place-items-center'>
          {cardList.map((card, index) => {
            return <Card key={index} id={card.id} mark={card.mark} status={card.status} />
          })}
        </div>
      ) : (
        <p>まだ試合は始まっていません</p>
      )}
    </>
  )
}
