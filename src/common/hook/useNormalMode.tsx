import { useAtomValue, useSetAtom } from 'jotai'

import { setCardStatusToCloseAtom, setCardStatusToNullAtom, setCardStatusToOpenAtom } from '@/atom/boardAtom'
import { addSelectedCardAtom, addUserCardListAtom, resetSelectedCardAto, userAtom } from '@/atom/userAtom'

import type { CardType } from '../type'
import { useAudio } from './useAudio'
import { useTimer } from './useTimer'

export const useNormalMode = () => {
  const selectedCard = useAtomValue(userAtom).selectedCard

  const resetSelectedCard = useSetAtom(resetSelectedCardAto)
  const addSelectedCard = useSetAtom(addSelectedCardAtom)
  const addUserCardList = useSetAtom(addUserCardListAtom)

  const setCardStatusToOpen = useSetAtom(setCardStatusToOpenAtom)
  const setCardStatusToNull = useSetAtom(setCardStatusToNullAtom)
  const setCardStatusToClose = useSetAtom(setCardStatusToCloseAtom)

  const { waitSeconds } = useTimer()

  const { flipAudio } = useAudio()

  const firstUserTurnNormalMode = (firstCard: CardType) => {
    flipAudio.play()
    setCardStatusToOpen(firstCard)
    addSelectedCard(firstCard)
  }

  const secondUserTurnNormalMode = async (secondCard: CardType) => {
    flipAudio.play()
    setCardStatusToOpen(secondCard)
    if (!selectedCard) return
    const isPair: boolean = selectedCard.id === secondCard.id && selectedCard.mark !== secondCard.mark

    if (isPair) {
      await waitSeconds(1200)
      setCardStatusToNull(selectedCard, secondCard)
      addUserCardList(selectedCard, secondCard)
      resetSelectedCard()
      return
    }

    await waitSeconds(1200)
    setCardStatusToClose(selectedCard, secondCard)
    resetSelectedCard()
    return
  }


  return { firstUserTurnNormalMode, secondUserTurnNormalMode }
}
