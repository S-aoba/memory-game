import { boardAtom, changeTurnAtom } from '@/atom/boardAtom'
import {
  addSelectedCardListAtom,
  addUserCardListAtom,
  checkIsPairAtom,
  flipCardAtom,
  hideCardAtom,
  resetCardListAtom,
  resetSelectedCardListAtom,
  selectedCardListAtom,
} from '@/atom/cardAtom'
import { useAudio } from '@/common/hook/useAudio'
import { CardType } from '@/common/type'
import { useAtomValue, useSetAtom } from 'jotai'

export const useCard = (selectedCard: CardType) => {
  const selectedCardList = useAtomValue(selectedCardListAtom)
  const flipCard = useSetAtom(flipCardAtom)
  const addSelectedCardList = useSetAtom(addSelectedCardListAtom)
  const checkIsPair = useSetAtom(checkIsPairAtom)
  const resetSelectedCardList = useSetAtom(resetSelectedCardListAtom)
  const resetCardList = useSetAtom(resetCardListAtom)
  const addUserCardList = useSetAtom(addUserCardListAtom)
  const hideCard = useSetAtom(hideCardAtom)
  const changeTurn = useSetAtom(changeTurnAtom)
  const board = useAtomValue(boardAtom)

  const { userGetCardAudio, flipAudio } = useAudio()

  const flipAndAdd = (selectedCard: CardType) => {
    flipAudio.play()
    flipCard(selectedCard)
    addSelectedCardList(selectedCard)
  }

  // atomの状態の変更に関しては、cardAtom.tsで行い、handleSelectCardではそれ以外の処理を行う
  const handleSelectCard = () => {
    if (board.currentTurn === 'cpu') return
    const selectedCardListLength = selectedCardList.length
    if (selectedCardListLength === 2) {
      return
    } else if (selectedCardListLength === 0) {
      flipAndAdd(selectedCard)
      return
    } else if (selectedCardListLength === 1) {
      const isPair = checkIsPair(selectedCard)
      if (!isPair) {
        flipAndAdd(selectedCard)
        resetCardList()
        setTimeout(() => {
          resetSelectedCardList()
          changeTurn()
        }, 1500)
        return
      }
      flipAndAdd(selectedCard)
      hideCard(selectedCard)
      setTimeout(() => {
        addUserCardList()
        userGetCardAudio.play()
      }, 1000)
      setTimeout(() => {
        resetSelectedCardList()
        changeTurn()
        return
      }, 2000)
    }
  }

  return { handleSelectCard }
}
