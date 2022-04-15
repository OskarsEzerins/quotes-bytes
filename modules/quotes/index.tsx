import React, { useCallback, useEffect, useState } from 'react'

import styles from './styles.module.sass'

import { getProgrammingQuotes, QuoteData } from 'modules/common/quotesSources'
import { useKeyPress } from 'modules/hooks'

import classNames from 'classnames'
import { RiRefreshLine } from 'react-icons/ri'

function Quote({ isLoading, data }: { isLoading: boolean; data: QuoteData }): JSX.Element {
  if (isLoading) {
    return <div>Loading...</div>
  } else if (!data) {
    return <div>No quotes available :(</div>
  }

  const { quote, author } = data

  return (
    <div>
      <p>{`"${quote}"`}</p>
      <p className={styles.author}>{`- ${author}`}</p>
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
      <Quote isLoading={isLoading} data={data} />
      <button className={styles.refresh_button} onClick={loadData} disabled={isLoading}>
        <RiRefreshLine className={classNames({ [styles.rotating]: isLoading })} />
        {classNames({
          '(press spacebar)': !('ontouchstart' in document.documentElement),
        })}
      </button>
    </main>
  )
}

export default Quotes
