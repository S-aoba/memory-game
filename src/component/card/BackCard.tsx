'use client'

import { checkSelectedCardListAtom, deleteCardAtom, toggleCardStatusAtom } from '@/atom'
import { CardType } from '@/common/type'
import { useAtom, useSetAtom } from 'jotai'
import { NextPage } from 'next'

/**
 * @package
 */

export const BackCard: NextPage<Omit<CardType, 'status'>> = ({ id, mark }) => {
  const toggleCardStatus = useSetAtom(toggleCardStatusAtom)
  const [selectedCardList, checkSelectedCardList] = useAtom(checkSelectedCardListAtom)
  const deleteCard = useSetAtom(deleteCardAtom)
  const handleToggle = () => {
    toggleCardStatus({ id, mark })
    const isExist = checkSelectedCardList({ id, mark, status: 'open' })
    if (isExist) {
      // 1秒後に削除
      setTimeout(() => {
        deleteCard(selectedCardList[0].id, id)
      }, 1000)
    }
  }
  return (
    <div
      className='hover: col-span-1 h-36 w-20 rounded-lg bg-white p-2 outline-yellow-300 hover:cursor-pointer hover:outline hover:outline-4 hover:outline-offset-4'
      onClick={handleToggle}
    >
      <div className='h-full w-full rounded-lg bg-slate-500'></div>
    </div>
  )
}
