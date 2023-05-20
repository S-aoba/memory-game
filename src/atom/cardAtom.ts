import { CARD_LIST_DATA } from '@/common/card-data'
import { CardType } from '@/common/type'
import { Status } from '@/common/type/type'
import { atom } from 'jotai'
import { userCardListAtom } from './userAtom'
import { useAudio } from '@/common/hook/useAudio'

// Card
export const cardListAtom = atom<CardType[]>(CARD_LIST_DATA)
export const selectedCardListAtom = atom<CardType[]>([])
const { userGetCardAudio, flipAudio } = useAudio()

export const flipCardAtom = atom(null, (get, set, selectCard: CardType) => {
  const currentSelectedCardList = get(selectedCardListAtom)
  // カードを２枚選択中であれば、それ以上は選択できないようにする
  if (currentSelectedCardList.length === 2) {
    return
  }
  //  カードを裏返す
  const newCardList = get(cardListAtom).map((card) => {
    if (card.id === selectCard.id && card.mark === selectCard.mark) {
      return {
        ...card,
        // 疑問:ここはこの書き方でいいのか？ as Status
        status: 'open' as Status,
      }
    }
    return card
  })
  set(cardListAtom, newCardList)
})

// カードを選択したときの処理
export const selectAndCheckCardAtom = atom(null, (get, set, selectedCard: CardType) => {
  const currentSelectedCardList = get(selectedCardListAtom)

  // カードを２枚選択中であれば、それ以上は選択できないようにする
  if (currentSelectedCardList.length === 2) {
    return
  }

  flipAudio.play()

  // カードがまだ選択されていない場合は、選択したカードをselectedCardListAtomに追加する
  if (currentSelectedCardList.length === 0) {
    const newSelectedCardList = [...currentSelectedCardList, selectedCard]
    set(selectedCardListAtom, newSelectedCardList)
    return
  }
  // カードが既に１枚選択されている場合は、選択したカードをselectedCardListAtomに追加する
  const newSelectedCardList = [...currentSelectedCardList, selectedCard]
  set(selectedCardListAtom, newSelectedCardList)
  // カードが既に１枚選択されていれば、選択したカードと一致するかどうかを確認する
  const isPear = currentSelectedCardList.some((card) => {
    return card.id === selectedCard.id
  })
  // 一致していなければ1秒後にリセットする
  if (!isPear) {
    setTimeout(() => {
      const newCardList = get(cardListAtom).map((card) => {
        if (card.status === 'open') {
          return {
            ...card,
            status: 'close' as Status,
          }
        }
        return card
      })
      set(selectedCardListAtom, [])
      set(cardListAtom, newCardList)
    }, 1000)
    return
  }
  // 一致していれば、1秒後に選択しているCardのstatusをnullにする
  setTimeout(() => {
    const prevCard = currentSelectedCardList[0]
    const newCardList = get(cardListAtom).map((card) => {
      if (
        (card.id === selectedCard.id && card.mark === selectedCard.mark) ||
        (card.id === prevCard.id && card.mark === prevCard.mark)
      ) {
        return {
          ...card,
          status: null,
        }
      }
      return card
    })

    set(selectedCardListAtom, [])
    set(cardListAtom, newCardList)

    // ここで、userCardListAtomを更新する
    const currentUserCardList = get(userCardListAtom)
    set(userCardListAtom, [...currentUserCardList, [currentSelectedCardList[0], selectedCard]])
    userGetCardAudio.play()
  }, 1000)
})
