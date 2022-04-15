import { handleAxiosException } from 'modules/common/axiosUtils'

import axios from 'axios'

export const ZEN_QUOTES_URL = 'https://zenquotes.io/api/random'
export const PROGRAMMING_QUOTES_URL = 'https://programming-quotes-api.herokuapp.com/quotes/random'

export type QuoteData = { quote: string; author: string } | undefined

export const getProgrammingQuotes = async (): Promise<QuoteData> => {
  try {
    const { data } = await axios.get(PROGRAMMING_QUOTES_URL)
    return { quote: data.en, author: data.author }
  } catch (error) {
    handleAxiosException(error)
  }
}
