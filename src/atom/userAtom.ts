import { UserType } from '@/common/type/type'
import { atom } from 'jotai'


export const userAtom = atom<UserType>({
  name: '',
  cardList: [],
})
