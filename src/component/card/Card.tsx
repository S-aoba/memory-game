'use client'
import { NextPage } from 'next'
import { FrontCard } from './FrontCard'
import { BackCard } from './BackCard'
import { CardType } from '@/common/type'

export const Card: NextPage<CardType> = ({ id, mark, status }) => {
  return <>{status === 'open' ? <FrontCard id={id} mark={mark} status={status}/> : <BackCard id={id} mark={mark} status={status} />}</>
}
