import { CARD_LIST_DATA } from '@/common/card-data'
import { CardType } from '@/common/type'
import { atom } from 'jotai'



// Card
export const cardListAtom = atom<CardType[]>(CARD_LIST_DATA)
export const selectedCardListAtom = atom<CardType[]>([])
