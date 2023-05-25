'use client'
import type { NextPage } from 'next'

import type { CardType } from '@/common/type'

import { BackCard } from './BackCard'
import { FrontCard } from './FrontCard'

export const Card: NextPage<CardType> = ({ id, mark, status }) => {
  return (
    <>
      {status === 'open' ? (
        <FrontCard id={id} mark={mark} status={status} />
      ) : (
        <BackCard id={id} mark={mark} status={status} />
      )}
    </>
  )
}
