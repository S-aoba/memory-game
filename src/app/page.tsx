import { Card } from '@/component/card'

export default function GameBoard() {
  return (
    <main className='flex h-screen w-screen items-center justify-center bg-gray-400'>
      <div className=' flex h-full max-h-[800px] w-11/12 max-w-[800px] items-center justify-center rounded-md bg-green-600 px-3 py-5'>
        <div className=' grid h-full w-full grid-cols-7 place-content-around place-items-center'>
          {cardList.map((card, index) => {
            return <Card key={index} id={card.id} mark={card.mark} />
          })}
        </div>
      </div>
    </main>
  )
}

type CardType = {
  id: number
  mark: 'hart' | 'spade' | 'diamond' | 'club'
}
const cardList: CardType[] = [
  {
    id: 1,
    mark: 'hart',
  },
  {
    id: 2,
    mark: 'hart',
  },
  {
    id: 3,
    mark: 'hart',
  },
  {
    id: 4,
    mark: 'hart',
  },

  {
    id: 5,
    mark: 'hart',
  },
  {
    id: 1,
    mark: 'spade',
  },
  {
    id: 2,
    mark: 'spade',
  },
  {
    id: 3,
    mark: 'spade',
  },
  {
    id: 4,
    mark: 'spade',
  },

  {
    id: 5,
    mark: 'spade',
  },
]
