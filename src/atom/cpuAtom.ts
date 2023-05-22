import { CpuType } from '@/common/type/type'
import { atom } from 'jotai'

export const cpuAtom = atom<CpuType>({
  cpuCardList: [],
})
