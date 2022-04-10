import { PROGRAMMING_QUOTES_URL } from 'modules/common/quotesSources'
import React from 'react'
import useSWR from 'swr'

const fetcher = (input: RequestInfo, init?: RequestInit | undefined) => fetch(input, init).then((res) => res.json())

function Quotes() {
  const { data, error } = useSWR(PROGRAMMING_QUOTES_URL, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  })

  if (error) return <div>Failed to load</div>
  if (!data) return <div>Loading...</div>

  return (
    <div>
      <p>{data.en}</p>
    </div>
  )
}

export default Quotes
