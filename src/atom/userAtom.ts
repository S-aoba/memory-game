import { atom } from 'jotai'

import type { UserType } from '@/common/type'

export const userAtom = atom<UserType>({
  name: '',
  selectedCard: null,
  userCardList: [],
})
