'use client'

import { CardType } from '@/common/type'
import { IconClubs, IconDiamond, IconHeart, IconSpade } from '@tabler/icons-react'

/**
 * @package
 */
export const UserCard = ({ card }: { card: CardType[] }) => {
  return (
    <div className='relative col-span-1 flex w-fit'>
      <Card id={card[0].id} mark={card[0].mark} />
      <div className=' absolute left-12 z-10 h-36 w-20 rotate-12 rounded-lg bg-white p-2 shadow-md'>
        <div className='flex h-full w-full flex-col'>
          <div className=' flex justify-start'>
            {card[1].mark === 'hart' ? (
              <span className='text-xl text-red-500'>{card[1].id}</span>
            ) : (
              <span className='text-xl'>{card[1].id}</span>
            )}
          </div>
          <div className='flex h-full items-center justify-center'>
            {card[1].mark === 'hart' && <IconHeart size={50} fill='red' color='red' />}
            {card[1].mark === 'spade' && <IconSpade size={50} fill='black' />}
            {card[1].mark === 'diamond' && <IconDiamond size={50} fill='white' />}
            {card[1].mark === 'club' && <IconClubs size={50} fill='black' />}
          </div>
          <div className=' flex justify-end'>
            {card[1].mark === 'hart' ? (
              <span className='text-xl text-red-500'>{card[1].id}</span>
            ) : (
              <span className='text-xl'>{card[1].id}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

const Card = ({ id, mark }: { id: number; mark: string }) => {
  return (
    <div className=' absolute left-6 h-36 w-20 rounded-lg bg-white p-2 shadow-md'>
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
