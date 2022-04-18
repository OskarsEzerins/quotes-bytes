import { handleAxiosException } from 'modules/common/axiosUtils'

import axios from 'axios'

export const PROGRAMMING_QUOTES_URL = 'https://programming-quotes-api.herokuapp.com/quotes/random'
export const KIMI_QUOTES_URL = 'https://kimiquotes.herokuapp.com/quote'
export const QUOTABLE_QUOTES_URL = 'https://api.quotable.io/random'

const QUOTABLE_TAGS = [
  'famous-quotes',
  'life',
  'love',
  'inspirational',
  'friendship',
  'wisdom',
  'happiness',
  'technology',
  'science',
] as const
type QuotableTag = typeof QUOTABLE_TAGS[number]

export const QUOTE_KINDS = [...QUOTABLE_TAGS, 'programming', 'Kimi'] as const
export type QuoteKind = typeof QUOTE_KINDS[number]
export type QuoteData = { quote: string; author: string } | undefined

export const getQuote = (kind: QuoteKind): Promise<QuoteData> => {
  switch (true) {
    case kind === 'programming':
      return getProgrammingQuote()
    case kind === 'Kimi':
      return getKimiQuote()
    case QUOTABLE_TAGS.includes(kind as QuotableTag):
      return getQuotableQuote(kind as QuotableTag)
    default:
      return Promise.reject(new Error('Invalid quote kind'))
  }
}

const getProgrammingQuote = async (): Promise<QuoteData> => {
  try {
    const { data } = await axios.get(PROGRAMMING_QUOTES_URL)
    return { quote: data.en, author: data.author }
  } catch (error) {
    handleAxiosException(error)
  }
}

const getKimiQuote = async (): Promise<QuoteData> => {
  try {
    const { data } = await axios.get(KIMI_QUOTES_URL)
    return { quote: data.quote, author: 'Kimi Räikkönen' }
  } catch (error) {
    handleAxiosException(error)
  }
}

const getQuotableQuote = async (type: QuotableTag): Promise<QuoteData> => {
  try {
    const { data } = await axios.get(QUOTABLE_QUOTES_URL, { params: { tags: type } })

    return { quote: data.content, author: data.author }
  } catch (error) {
    handleAxiosException(error)
  }
}
