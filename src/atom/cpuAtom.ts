import { atom } from 'jotai'

import type { CpuType } from '@/common/type/type'

export const cpuAtom = atom<CpuType>({
  cpuCardList: [],
})
