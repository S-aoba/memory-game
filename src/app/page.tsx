'use client'

import { useSetAtom } from 'jotai'
import Link from 'next/link'

import { startGameAtom } from '@/atom/boardAtom'

export default function StartPage() {
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
    <div className=' flex h-screen w-screen flex-col items-center justify-center gap-y-10 bg-gradient-to-b from-slate-200 to-slate-400'>
      <div className='flex flex-col gap-y-2 text-center'>
        <h1 className='font-serif text-4xl text-white opacity-80'>Memory Game</h1>
        <h2 className='font-serif text-slate-200'>Train Your Brain with the Ultimate Memory Game Experience</h2>
      </div>
      <div className='flex gap-x-10 p-3'>
        <Link href={'/board'}>
          <button
            onClick={handleEasyMode}
            className='rounded-lg bg-gradient-to-r from-blue-400 to-blue-600 px-4 py-2 text-white hover:outline hover:outline-4 hover:outline-offset-4 hover:outline-blue-500'
          >
            Easy
          </button>
        </Link>

        <Link href={'/board'}>
          <button
            onClick={handleNormalMode}
            className='rounded-lg  bg-gradient-to-r from-amber-400 to-amber-600 px-4 py-2 text-white hover:outline hover:outline-4 hover:outline-offset-4 hover:outline-amber-500'
          >
            Normal
          </button>
        </Link>

        <Link href={'/board'}>
          <button
            onClick={handleHardMode}
            className='rounded-lg  bg-gradient-to-r from-red-400 to-red-600 px-4 py-2 text-white hover:outline hover:outline-4 hover:outline-offset-4 hover:outline-red-500'
          >
            Hard
          </button>
        </Link>
      </div>
    </div>
  )
}
