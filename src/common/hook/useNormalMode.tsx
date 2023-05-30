import { useAtomValue, useSetAtom } from 'jotai'

import {
  boardAtom,
  changeTurnAtom,
  setCardStatusToCloseAtom,
  setCardStatusToNullAtom,
  setCardStatusToOpenAtom,
} from '@/atom/boardAtom'
import { cpuAtom } from '@/atom/cpuAtom'
import {
  addSelectedCardAtom,
  addUserCardListAtom,
  checkPairCardInMemoryAtom,
  resetSelectedCardAto,
  userAtom,
} from '@/atom/userAtom'

import type { CardType } from '../type'
import { useAudio } from './useAudio'
import { useCard } from './useCard'
import { useTimer } from './useTimer'

export const useNormalMode = () => {
  const cardList = useAtomValue(boardAtom).cardList
  const memoryCardList = useAtomValue(cpuAtom).memoryCardList

  const selectedCard = useAtomValue(userAtom).selectedCard

  const resetSelectedCard = useSetAtom(resetSelectedCardAto)
  const addSelectedCard = useSetAtom(addSelectedCardAtom)
  const addUserCardList = useSetAtom(addUserCardListAtom)
  const checkPairCardInMemory = useSetAtom(checkPairCardInMemoryAtom)

  const setCardStatusToOpen = useSetAtom(setCardStatusToOpenAtom)
  const setCardStatusToNull = useSetAtom(setCardStatusToNullAtom)
  const setCardStatusToClose = useSetAtom(setCardStatusToCloseAtom)

  const changeTurn = useSetAtom(changeTurnAtom)

  const { waitSeconds } = useTimer()

  const { flipAudio, getCardAudio } = useAudio()

  const { flipOpenCard, generateRandomCard, isPair, isNotPair, filterCardList } = useCard()

  const firstUserTurnNormalMode = (firstCard: CardType) => {
    flipAudio.play()
    setCardStatusToOpen(firstCard)
    addSelectedCard(firstCard)
  }

  const secondUserTurnNormalMode = async (secondCard: CardType) => {
    flipAudio.play()
    setCardStatusToOpen(secondCard)
    if (!selectedCard) return
    const isPair: boolean = selectedCard.id === secondCard.id && selectedCard.mark !== secondCard.mark

    if (isPair) {
      await waitSeconds(1200)
      setCardStatusToNull(selectedCard, secondCard)
      addUserCardList(selectedCard, secondCard)
      checkPairCardInMemory(secondCard)
      getCardAudio.play()
      resetSelectedCard()
      // pairになったカードがmemoryCardList内にあれば、memoryCardListから削除する
      return
    } else {
      await waitSeconds(1200)
      setCardStatusToClose(selectedCard, secondCard)
      resetSelectedCard()
      return
    }
  }

  const cpuTurnNormalMode = async () => {
    const closeOnlyCardList = cardList.filter((card: CardType) => {
      return card.status === 'close'
    })
    const memoryCardListLength = memoryCardList.length

    if (memoryCardListLength === 0) {
      // console.log('メモリーには何もありません')

      // 1枚目の取得
      await waitSeconds(1200)
      const firstCard = generateRandomCard(closeOnlyCardList)
      flipOpenCard(firstCard)
      // console.log('ランダムで１枚目を取得しました')

      // 2枚目の取得
      await waitSeconds(1200)
      const nonFirstCardList = closeOnlyCardList.filter((card: CardType) => {
        return card !== firstCard
      })
      const secondCard = generateRandomCard(nonFirstCardList)
      flipOpenCard(secondCard)
      // console.log('ランダムで２枚目を取得しました')

      // １枚目と２枚目がPairかどうかの確認
      await waitSeconds(1200)
      const isPairCard = firstCard.id === secondCard.id && firstCard.mark !== secondCard.mark

      // ペアカードの場合
      if (isPairCard) {
        isPair(firstCard, secondCard)
        // console.log('やった！ペアカードでした！')
        await waitSeconds(800)
        changeTurn()
        return
      }
      // ペアカードではない場合
      isNotPair(firstCard, secondCard)
      // console.log('残念！ペアカードではありませんでした！')
      await waitSeconds(800)
      changeTurn()
      return
    }
    // memoryCardList > 0
    else {
      // console.log('メモリーにカードがあります！')
      // 1枚目の取得
      await waitSeconds(1200)
      // memoryCardList内のカード以外のカードをcloseOnlyCardListから検索し、配列を取得
      const remainingCardList = filterCardList(closeOnlyCardList, memoryCardList)
      // console.log('m', memoryCardList)
      // console.log('remain', remainingCardList)
      const firstCard = generateRandomCard(remainingCardList)
      flipOpenCard(firstCard)
      // console.log('ランダムで１枚目を取得しました', firstCard)

      // 2枚目の取得
      await waitSeconds(1200)
      // nonFirstCardListからFirstCardのIdと同じカードを検索する
      const isPairCard = memoryCardList.find((card: CardType) => {
        return card.id === firstCard.id && card.mark !== firstCard.mark
      })

      if (isPairCard) {
        // isPairCardがtrueなら2枚目も取得されているのと同義なのでカードをオープンする
        flipOpenCard(isPairCard)
        // console.log('memoryCardListから２枚目を取得しました', isPairCard)

        await waitSeconds(1200)
        isPair(firstCard, isPairCard)
        // console.log('やった！memoryCardLisからペアカードを見つけました！')
        await waitSeconds(800)
        changeTurn()
        return
      }
      // memoryCardListにはなかった場合
      else {
        // close状態のcardListからFirstCardを除く配列を取得
        const nonFirstCardList = closeOnlyCardList.filter((card: CardType) => {
          return card !== firstCard
        })
        const secondCard = generateRandomCard(nonFirstCardList)
        flipOpenCard(secondCard)
        // console.log('ランダムで２枚目を取得しました', secondCard)

        // ランダムで選んだ結果Pairカードかどうかの判定
        await waitSeconds(1000)
        const isPairCard = firstCard.id === secondCard.id && firstCard.mark !== secondCard.mark

        if (isPairCard) {
          isPair(firstCard, secondCard)
          // console.log('やった！ペアカードを見つけました！')
          await waitSeconds(800)
          changeTurn()
          return
        }

        isNotPair(firstCard, secondCard)
        // console.log('残念！ペアカードではありませんでした！')

        await waitSeconds(800)
        changeTurn()
        return
      }
    }
  }
  return { firstUserTurnNormalMode, secondUserTurnNormalMode, cpuTurnNormalMode }
}
