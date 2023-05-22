import { UserType } from '@/common/type'
import { atom } from 'jotai'

export const userAtom = atom<UserType>({
  name: '',
  userCardList: [],
})
