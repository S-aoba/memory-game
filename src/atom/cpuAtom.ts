import { CardType, CpuType } from '@/common/type/type'
import { atom } from 'jotai'

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
