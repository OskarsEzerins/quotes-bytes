import React, { useCallback, useEffect, useRef, useState } from 'react'

import Quote from './Quote'
import styles from './styles.module.sass'

import { getProgrammingQuotes, QuoteData } from 'modules/common/quotesSources'
import { useKeyPress } from 'modules/hooks'

import classNames from 'classnames'
import { RiRefreshLine } from 'react-icons/ri'

function Quotes() {
  const [data, setData] = useState<QuoteData>()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const mustFetchData = useRef(true)
  const spaceBarPress = useKeyPress(' ')

  const loadData = useCallback(async () => {
    setIsLoading(true)

    const data = await getProgrammingQuotes()
    data && setData(data)

    setIsLoading(false)
  }, [setIsLoading, setData])

  useEffect(() => {
    if (spaceBarPress || mustFetchData.current) {
      loadData()
      mustFetchData.current = false
    }
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
