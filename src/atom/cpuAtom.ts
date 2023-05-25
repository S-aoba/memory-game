import { atom } from 'jotai'

import type { CardType, CpuType } from '@/common/type/type'

export const cpuAtom = atom<CpuType>({
  selectedCard: null,
  cpuCardList: [],
})

export const selectedCpuCardAtom = atom(
  (get) => {
    return get(cpuAtom).selectedCard
  },
  (get, set, currentCard: CardType) => {
    set(cpuAtom, {
      ...get(cpuAtom),
      selectedCard: currentCard,
    })
  }
)
