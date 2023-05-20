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
  currentTurn: 'player' | 'cpu'
  winner: 'player' | 'cpu' | null
}

export type UserType = {
  name: string
  cardList: CardType[][]
}
