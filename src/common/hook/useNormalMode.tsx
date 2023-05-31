import type { CardType } from '../type'

export const useNormalMode = () => {
  const firstUserTurnNormalMode = (firstCard: CardType) => {
    return
  }

  const secondUserTurnNormalMode = async (secondCard: CardType) => {
    return
  }

  const cpuTurnNormalMode = async () => {
    return
  }
  return { firstUserTurnNormalMode, secondUserTurnNormalMode, cpuTurnNormalMode }
}
