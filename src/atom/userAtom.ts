import { CardType } from '@/common/type'
import { atom } from 'jotai'

export const userCardListAtom = atom<CardType[][]>([])
