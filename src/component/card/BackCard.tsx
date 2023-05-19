'use client'

import {
  checkSelectedCardListAtom,
  deleteCardListAtom,
  resetCardListAtom,
  resetSelectedCardListAtom,
  toggleCardStatusAtom,
} from '@/atom'
import { CardType } from '@/common/type'
import { useAtom, useSetAtom } from 'jotai'
import { NextPage } from 'next'

/**
 * @package
 */

export const BackCard: NextPage<CardType> = ({ id, mark, status }) => {
  const toggleCardStatus = useSetAtom(toggleCardStatusAtom)
  const [selectedCardList, checkSelectedCardList] = useAtom(checkSelectedCardListAtom)
  const resetSelectedCardList = useSetAtom(resetSelectedCardListAtom)
  const deleteCard = useSetAtom(deleteCardListAtom)
  const resetCard = useSetAtom(resetCardListAtom)

  const handleToggle = () => {
    const isExist = checkSelectedCardList({ id, mark, status: 'open' })
    // selectedCardListがからの場合
    if (selectedCardList.length === 0) {
      toggleCardStatus({ id, mark })
      return
    }
    // selectedCardListが1つの場合
    else if (selectedCardList.length === 1) {
      toggleCardStatus({ id, mark })

      if (!isExist) {
        // 1秒後にリセット
        setTimeout(() => {
          resetCard(selectedCardList[0].id, id)
          resetSelectedCardList()
        }, 1000)
        return
      }
      // 1秒後に削除
      setTimeout(() => {
        deleteCard(selectedCardList[0], { id, mark, status })
        resetSelectedCardList()
      }, 1000)
      return
    }
    return
  }
  return (
    <>
      {status !== null ? (
        <div
          className='col-span-1 h-36 w-20 rounded-lg bg-white p-2 outline-yellow-300 hover:cursor-pointer hover:outline hover:outline-4 hover:outline-offset-4'
          onClick={handleToggle}
        >
          <div className='h-full w-full rounded-lg bg-slate-500'></div>
        </div>
      ) : (
        <div
          className='invisible col-span-1 h-36 w-20 rounded-lg bg-white p-2 outline-yellow-300 hover:cursor-pointer hover:outline hover:outline-4 hover:outline-offset-4'
          onClick={handleToggle}
        >
          <div className='h-full w-full rounded-lg bg-slate-500'></div>
        </div>
      )}
    </>
  )
}
