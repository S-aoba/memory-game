import { CardList } from '@/component/card/CardList'

export default function GameBoard() {
  return (
    <main className='flex h-screen w-screen items-center justify-center bg-gray-400'>
      <div className=' flex h-full max-h-[800px] w-11/12 max-w-[800px] items-center justify-center rounded-md bg-green-600 px-3 py-5'>
        <CardList />
      </div>
    </main>
  )
}
