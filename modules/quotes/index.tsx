import React, { useCallback, useEffect, useState } from 'react'

import styles from './styles.module.sass'

import { getProgrammingQuotes, QuoteData } from 'modules/common/quotesSources'
import { useKeyPress } from 'modules/hooks'

function Quote({ isLoading, data }: { isLoading: boolean; data: QuoteData }): JSX.Element {
  if (!data) {
    return <div>No quotes available :(</div>
  } else if (isLoading) {
    return <div>Loading...</div>
  }

  const { quote, author } = data

  return (
    <div>
      <p>{`"${quote}"`}</p>
      <p>{`- ${author}`}</p>
    </div>
  )
}

function Quotes() {
  const [data, setData] = useState<QuoteData>()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const spaceBarPress = useKeyPress(' ')

  const loadData = useCallback(async () => {
    setIsLoading(true)

    const data = await getProgrammingQuotes()
    data && setData(data)

    setIsLoading(false)
  }, [setIsLoading, setData])

  useEffect(() => {
    loadData()
  }, [loadData, spaceBarPress])

  return (
    <main className={styles.main}>
      <div className='flex column gap-1'>
        <Quote isLoading={isLoading} data={data} />
        <button type='button' onClick={loadData} disabled={isLoading}>
          refresh (spacebar)
        </button>
      </div>
    </main>
  )
}

export default Quotes
