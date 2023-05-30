export const useAudio = () => {
  const flipAudio = new Audio('flip-audio.mp3')
  const getCardAudio = new Audio('user-get-card-audio.mp3')
  return { flipAudio, getCardAudio }
}
