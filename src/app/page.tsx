'use client'

import { startGameAtom } from '@/atom/boardAtom'
import { useSetAtom } from 'jotai'
import Link from 'next/link'

export default function StartPage() {
  const startGame = useSetAtom(startGameAtom)

  return (
    <div className=' flex h-screen w-screen items-center justify-center'>
      <Link href={'/board'}>
        <button onClick={startGame} className=' rounded-lg bg-blue-500 px-4 py-2 text-white'>
          GameStart
        </button>
      </Link>
    </div>
  )
}
