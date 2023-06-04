import { useEffect, useState } from 'react'

export const useAudio = () => {
  const [flipAudio, setFlipAudio] = useState<HTMLAudioElement | null>(null)
  const [setCardAudio, setSetCardAudio] = useState<HTMLAudioElement | null>(null)

  useEffect(() => {
    setFlipAudio(new Audio('/flip-audio.mp3'))
    setSetCardAudio(new Audio('/user-get-card-audio.mp3'))
  }, [])

  return { flipAudio, setCardAudio }
}
