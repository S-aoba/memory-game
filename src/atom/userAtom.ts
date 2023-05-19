import { CardType } from '@/common/type'
import { atom } from 'jotai'

export const userCardListAtom = atom<CardType[][]>([
  [
    {
      id: 1,
      mark: 'hart',
      status: 'close',
    },
    {
      id: 1,
      mark: 'club',
      status: 'close',
    },
  ],
])
