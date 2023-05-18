'use client'
import { NextPage } from 'next'
import { FrontCard } from './FrontCard'
import { BackCard } from './BackCard'
import { useState } from 'react'

type CardProps = {
  id: number
  mark: 'hart' | 'spade' | 'diamond' | 'club'
}
export const Card: NextPage<CardProps> = ({ id, mark }) => {
  const [isFront, toggleIsFront] = useState(false)
  return (
    <>
      {isFront ? (
        <FrontCard id={id} mark={mark} toggleIsFront={toggleIsFront} />
      ) : (
        <BackCard toggleIsFront={toggleIsFront} />
      )}
    </>
  )
}
