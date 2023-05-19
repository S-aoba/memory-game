/**
 * @package
 */

export type CardType = {
  id: number
  mark: 'hart' | 'spade' | 'diamond' | 'club'
  status: Status
}

export type Status = 'open' | 'close' | null
