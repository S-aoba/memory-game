'use client'

import { CardList } from '@/component/card/CardList'
import { Cpu } from '@/component/cpu'
import { User } from '@/component/user'

export const Board = () => {
  return (
    <main className='flex h-screen w-screen items-center justify-center gap-x-3 bg-gray-400'>
      <User />
      <div className=' flex h-full max-h-[800px] w-11/12 max-w-[800px] items-center justify-center rounded-md bg-green-600 px-3 py-5'>
        <CardList />
      </div>
      <Cpu />
    </main>
  )
}

export default Board
