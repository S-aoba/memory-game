/**
 * @package
 */

export type Status = 'open' | 'close' | null

export type CardType = {
  id: number
  mark: 'hart' | 'spade' | 'diamond' | 'club'
  status: Status
}

export type Winner = 'player' | 'cpu' | 'draw'

type CurrentTurn = 'player' | 'cpu'

export type BoardType = {
  isFlip: boolean
  cardList: CardType[]
  selectedCard: CardType | null
  isGameStart: boolean
  isFinish: boolean
  currentTurn: CurrentTurn
  winner: Winner
}

export type HandCardList = {
  first: CardType
  second: CardType
}

export type UserType = {
  name: string
  selectedCard: CardType | null
  userCardList: HandCardList[]
}

export type CpuType = {
  memoryCardList: CardType[]
  cpuCardList: HandCardList[]
}
