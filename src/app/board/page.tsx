'use client'

import { useAtomValue } from 'jotai'

import { boardAtom } from '@/atom/boardAtom'
import { CardList } from '@/component/card/CardList'
import { Cpu } from '@/component/cpu'
import { User } from '@/component/user'

const Board = () => {
  const gameMode = useAtomValue(boardAtom).mode

  return (
    <main className='flex h-screen w-screen flex-col items-center bg-gradient-to-b from-slate-200 to-slate-400 pt-20'>
      <div className='w-full p-10 text-center'>
        <span className='font-serif text-3xl'>{gameMode}</span>
      </div>
      <div className='flex h-full w-full justify-center'>
        <User />
        <div className=' flex h-full max-h-[800px] w-11/12 max-w-[800px] items-center justify-center rounded-md bg-gradient-to-b from-green-600 to-emerald-600 px-3 py-5'>
          <CardList />
        </div>
        <Cpu />
      </div>
    </main>
  )
}

export default Board
