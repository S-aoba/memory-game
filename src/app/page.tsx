'use client'

import { useSetAtom } from 'jotai'
import Link from 'next/link'

import { startGameAtom } from '@/atom/boardAtom'

export default function StartPage() {
  const handleStartGame = useSetAtom(startGameAtom)

  return (
    <div className=' flex h-screen w-screen items-center justify-center'>
      <Link href={'/board'}>
        <button onClick={handleStartGame} className=' rounded-lg bg-blue-500 px-4 py-2 text-white'>
          GameStart
        </button>
      </Link>
    </div>
  )
}
