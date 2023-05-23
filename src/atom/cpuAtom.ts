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
  const cardList = get(boardAtom).cardList;
  const availableCardList = cardList.filter((card) => card.status !== null && card.status !== 'open');
  const randomCard = availableCardList[Math.floor(Math.random() * availableCardList.length)];
  return randomCard;
});

