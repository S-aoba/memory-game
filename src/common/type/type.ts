/**
 * @package
 */

export type Status = 'open' | 'close' | null

export type CardType = {
  id: number
  mark: 'hart' | 'spade' | 'diamond' | 'club'
  status: Status
}

export type BoardType = {
  isFlip: boolean
  cardList: CardType[]
  selectedCard: CardType | null
  isGameStart: boolean
  currentTurn: 'player' | 'cpu'
  winner: 'player' | 'cpu' | null
}

export type HandCardList = {
  first: CardType
  second: CardType
}

export type UserType = {
  name: string
  userCardList: HandCardList[]
}

export type CpuType = {
  cpuCardList: HandCardList[]
}
