import { CARD_LIST_DATA } from '@/common/card-data'
import { BoardType, CardType } from '@/common/type'
import { atom } from 'jotai'
import { userAtom } from './userAtom'
import { cpuAtom } from './cpuAtom'

export const boardAtom = atom<BoardType>({
  isFlip: true,
  cardList: CARD_LIST_DATA,
  selectedCard: null,
  isGameStart: false,
  currentTurn: 'player',
  winner: null,
})

export const startGameAtom = atom(null, (get, set) => {
  const currentBoard = get(boardAtom)

  const newState = {
    ...currentBoard,
    isGameStart: true,
  }
  set(boardAtom, newState)
})

export const changeTurnAtom = atom(null, (get, set) => {
  const currentTurn = get(boardAtom).currentTurn
  const nextTurn = currentTurn === 'player' ? 'cpu' : 'player'
  set(boardAtom, {
    ...get(boardAtom),
    currentTurn: nextTurn,
  })
})

export const resetSelectedCardAtom = atom(null, (get, set) => {
  const resetState = null
  set(boardAtom, {
    ...get(boardAtom),
    selectedCard: resetState,
  })
})

export const selectCardAtom = atom(
  (get) => get(boardAtom).selectedCard,
  (get, set, currentCard: CardType) => {
    if (!currentCard) return
    set(boardAtom, {
      ...get(boardAtom),
      selectedCard: currentCard,
    })
    // デバック用
    // const selectCard = get(boardAtom).selectedCard
    // console.log('selectedCard', selectCard)
  }
)

export const changeCardStatusAtom = atom(null, (get, set, currentCard: CardType, status: Pick<CardType, 'status'>) => {
  const newStatus = status.status
  const cardList = get(boardAtom).cardList
  const currentTurn = get(boardAtom).currentTurn
  const selectedCard = currentTurn === 'player' ? get(userAtom).selectedCard : get(cpuAtom).selectedCard

  const newCardList = cardList.map((card) => {
    if (newStatus === 'open' && card.id === currentCard.id && card.mark === currentCard.mark) {
      return {
        ...card,
        status: newStatus,
      }
    } else if (
      (newStatus === 'close' && selectedCard && card.id === selectedCard.id && card.mark === selectedCard.mark) ||
      (newStatus === 'close' && card.id === currentCard.id && card.mark === currentCard.mark)
    ) {
      return {
        ...card,
        status: newStatus,
      }
    } else if (
      (newStatus === null && selectedCard && card.id === selectedCard.id && card.mark === selectedCard.mark) ||
      (newStatus === null && card.id === currentCard.id && card.mark === currentCard.mark)
    ) {
      return {
        ...card,
        status: newStatus,
      }
    }
    return card
  })
  set(boardAtom, {
    ...get(boardAtom),
    cardList: newCardList,
  })
})

export const changeBoardStatusOfIsFlipAtom = atom(null, (get, set) => {
  set(boardAtom, {
    ...get(boardAtom),
    isFlip: !get(boardAtom).isFlip,
  })
})

export const addCardToUserCardListAtom = atom(null, (get, set, secondCard: CardType) => {
  const firstCard = get(userAtom).selectedCard
  if (!firstCard) return
  const newUserCardList = {
    first: firstCard,
    second: secondCard,
  }
  set(userAtom, {
    ...get(userAtom),
    userCardList: [...get(userAtom).userCardList, newUserCardList],
  })
})

// export const generateCpuCardAtom = atom(null, (get, _) => {
//   const cardList = get(boardAtom).cardList
//   const availableCardList = cardList.filter((card) => card.status !== null && card.status !== 'open')
//   const randomId = Math.floor(Math.random() * 5) + 1
//   const randomCardList = availableCardList.filter((card) => card.id === randomId)
//   const cpuCard = randomCardList[Math.floor(Math.random() * randomCardList.length)]
//   return cpuCard
// })

export const addCardToCpuCardListAtom = atom(null, (get, set, secondCard: CardType) => {
  const firstCard = get(cpuAtom).selectedCard
  if (!firstCard) return
  const newCpuCardList = {
    first: firstCard,
    second: secondCard,
  }
  set(cpuAtom, {
    ...get(cpuAtom),
    cpuCardList: [...get(cpuAtom).cpuCardList, newCpuCardList],
  })
})
