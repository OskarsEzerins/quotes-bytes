import { handleAxiosException } from 'modules/common/axiosUtils'

import axios from 'axios'

const QUOTES_API_URL = 'https://quotes-api-self.vercel.app/quote'

export const QUOTE_KINDS = ['inspirational'] as const
export type QuoteKind = typeof QUOTE_KINDS[number]
export type QuoteData = { quote: string; author: string } | undefined

export const getQuote = async (): Promise<QuoteData> => {
  try {
    const { data } = await axios.get(QUOTES_API_URL)
    return { quote: data.quote, author: data.author }
  } catch (error) {
    handleAxiosException(error)
  }
}
