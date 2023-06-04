'use client'

import { useAtomValue, useSetAtom } from 'jotai'

import { boardAtom, startGameAtom } from '@/atom/boardAtom'
import { CardList } from '@/component/card/CardList'
import { Cpu } from '@/component/cpu'
import { User } from '@/component/user'

export default function StartPage() {
  const isStart = useAtomValue(boardAtom).isGameStart
  const gameMode = useAtomValue(boardAtom).mode

  const startGame = useSetAtom(startGameAtom)

  const handleEasyMode = () => {
    startGame('easy')
  }

  const handleNormalMode = () => {
    startGame('normal')
  }

  const handleHardMode = () => {
    startGame('hard')
  }

  return (
    <>
      {isStart ? (
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
      ) : (
        <div className=' flex h-screen w-screen flex-col items-center justify-center gap-y-10 bg-gradient-to-b from-slate-200 to-slate-400'>
          <div className='flex flex-col gap-y-2 text-center'>
            <h1 className='font-serif text-4xl text-white opacity-80'>Memory Game</h1>
            <h2 className='font-serif text-slate-200'>Train Your Brain with the Ultimate Memory Game Experience</h2>
          </div>
          <div className='flex gap-x-10 p-3'>
            <button
              onClick={handleEasyMode}
              className='rounded-lg bg-gradient-to-r from-blue-400 to-blue-600 px-4 py-2 text-white hover:outline hover:outline-4 hover:outline-offset-4 hover:outline-blue-500'
            >
              Easy
            </button>

            <button
              onClick={handleNormalMode}
              className='rounded-lg  bg-gradient-to-r from-amber-400 to-amber-600 px-4 py-2 text-white hover:outline hover:outline-4 hover:outline-offset-4 hover:outline-amber-500'
            >
              Normal
            </button>

            <button
              onClick={handleHardMode}
              className='rounded-lg  bg-gradient-to-r from-red-400 to-red-600 px-4 py-2 text-white hover:outline hover:outline-4 hover:outline-offset-4 hover:outline-red-500'
            >
              Hard
            </button>
          </div>
        </div>
      )}
    </>
  )
}
