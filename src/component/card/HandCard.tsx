'use client'

import { IconClubs, IconDiamond, IconHeart, IconSpade } from '@tabler/icons-react'

import type { HandCardList } from '@/common/type/type'

/**
 * @package
 */
export const HandCard = ({ card }: { card: HandCardList }) => {
  return (
    <div className='relative col-span-1 flex w-fit'>
      <Card id={card.first.id} mark={card.first.mark} />
      <div className=' absolute left-14 z-10 h-36 w-20 rotate-6 rounded-lg bg-white p-2 shadow-md'>
        <div className='flex h-full w-full flex-col'>
          <div className=' flex justify-start'>
            {card.second.mark === 'hart' ? (
              <span className='text-xl text-red-500'>{card.second.id}</span>
            ) : (
              <span className='text-xl'>{card.second.id}</span>
            )}
          </div>
          <div className='flex h-full items-center justify-center'>
            {card.second.mark === 'hart' && <IconHeart size={50} fill='red' color='red' />}
            {card.second.mark === 'spade' && <IconSpade size={50} fill='black' />}
            {card.second.mark === 'diamond' && <IconDiamond size={50} fill='white' />}
            {card.second.mark === 'club' && <IconClubs size={50} fill='black' />}
          </div>
          <div className=' flex justify-end'>
            {card.second.mark === 'hart' ? (
              <span className='text-xl text-red-500'>{card.second.id}</span>
            ) : (
              <span className='text-xl'>{card.second.id}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

const Card = ({ id, mark }: { id: number; mark: string }) => {
  return (
    <div className=' absolute left-3 h-36 w-20 -rotate-6 rounded-lg bg-white p-2 shadow-md'>
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
