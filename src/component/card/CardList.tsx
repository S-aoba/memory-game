'use client'

import { useAtomValue } from 'jotai'
import { Card } from './Card'
import { cardListAtom } from '@/atom'

export const CardList = () => {
  const cardList = useAtomValue(cardListAtom)
  return (
    <div className=' grid h-full w-full grid-cols-7 place-content-around place-items-center'>
      {cardList.map((card, index) => {
        return <Card key={index} id={card.id} mark={card.mark} />
      })}
    </div>
  )
}
