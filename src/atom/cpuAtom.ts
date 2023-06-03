import { atom } from 'jotai'

import type { CardType, CpuType } from '@/common/type/type'

export const cpuAtom = atom<CpuType>({
  memoryCardList: [
    // {
    //   id: 1,
    //   mark: 'hart',
    //   status: 'close',
    // },
    // {
    //   id: 2,
    //   mark: 'club',
    //   status: 'close',
    // },
    // {
    //   id: 3,
    //   mark: 'hart',
    //   status: 'close',
    // },
    // {
    //   id: 3,
    //   mark: 'spade',
    //   status: 'close',
    // },
    // {
    //   id: 4,
    //   mark: 'hart',
    //   status: 'close',
    // },
    // {
    //   id: 4,
    //   mark: 'club',
    //   status: 'close',
    // },
    // {
    //   id: 4,
    //   mark: 'diamond',
    //   status: 'close',
    // },
  ],
  cpuCardList: [],
})

export const setCpuCardListAtom = atom(null, (get, set, firstCard: CardType, secondCard: CardType) => {
  const newUserCardList = {
    first: firstCard,
    second: secondCard,
  }
  set(cpuAtom, {
    ...get(cpuAtom),
    cpuCardList: [...get(cpuAtom).cpuCardList, newUserCardList],
  })
})

export const resetMemoryAtom = atom(null, (get, set) => {
  set(cpuAtom, {
    ...get(cpuAtom),
    memoryCardList: [],
  })
})
