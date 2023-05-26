'use client'

import { useSetAtom } from 'jotai'
import Link from 'next/link'

import { startGameAtom } from '@/atom/boardAtom'

export default function StartPage() {
  const handleStartGame = useSetAtom(startGameAtom)

  return (
    <div className=' flex h-screen w-screen items-center justify-center gap-x-10'>
      <Link href={'/board'}>
        <button onClick={handleStartGame} className=' rounded-lg bg-blue-500 px-4 py-2 text-white'>
          Easy
        </button>
      </Link>

      <Link href={'/board'}>
        <button onClick={handleStartGame} className=' rounded-lg bg-amber-500 px-4 py-2 text-white'>
          Normal
        </button>
      </Link>

      <Link href={'/board'}>
        <button onClick={handleStartGame} className=' rounded-lg bg-red-500 px-4 py-2 text-white'>
          Hard
        </button>
      </Link>
    </div>
  )
}
