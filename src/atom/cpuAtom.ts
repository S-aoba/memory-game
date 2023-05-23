import { CardType, CpuType } from '@/common/type/type'
import { atom } from 'jotai'
import { boardAtom } from './boardAtom'

export const cpuAtom = atom<CpuType>({
  selectedCard: null,
  cpuCardList: [],
})

export const selectedCpuCardAtom = atom(
  (get) => get(cpuAtom).selectedCard,
  (get, set, currentCard: CardType) => {
    set(cpuAtom, {
      ...get(cpuAtom),
      selectedCard: currentCard,
    })
  }
)

export const generateCpuCardAtom = atom(null, (get, _) => {
  const cardList = get(boardAtom).cardList
  const availableCardList = cardList.filter((card) => card.status !== null && card.status !== 'open')
  const randomId = Math.floor(Math.random() * 5) + 1
  const randomCardList = availableCardList.filter((card) => card.id === randomId)
  const cpuCard = randomCardList[Math.floor(Math.random() * randomCardList.length)]
  return cpuCard
})
