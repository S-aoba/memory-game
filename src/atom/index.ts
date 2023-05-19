import { cardListData } from '@/common/card-data'
import { CardType } from '@/common/type'
import { atom } from 'jotai'

export const cardListAtom = atom<CardType[]>(cardListData)
