import axios from 'axios'
import { PROGRAMMING_QUOTES_URL } from 'modules/common/quotesSources'
import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react'
import { PROGRAMMING_QUOTES_RESPONSE } from './types'
import styles from './styles.module.sass'
import { useKeyPress } from 'modules/hooks'

function Quotes() {
  const [data, setData] = useState<PROGRAMMING_QUOTES_RESPONSE>({})
  const [isLoading, setIsLoading] = useState<boolean | undefined>()
  const [error, setError] = useState<boolean | undefined>()
  const spaceBarPress = useKeyPress(' ')

  const loadData = useCallback(() => {
    setIsLoading(true)

    axios
      .get(PROGRAMMING_QUOTES_URL)
      .then(({ data }) => typeof data?.en === 'string' ? setData(data) : setError(true))
      .catch((_err) => setError(true))
      .then(() => setIsLoading(false))
  }, [setIsLoading, setData, setError])

  useLayoutEffect(() => {
    // NOTE: requests are made in development twice due to react strict mode
    loadData()
  }, [loadData])

  useEffect(() => {
    spaceBarPress && loadData()
  }, [loadData, spaceBarPress])

  if (error) return <div>Failed to load</div>

  return (
    <main className={styles.main}>
      <div className='flex column gap-1'>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <div>
            <p>{`"${data.en}"`}</p>
            <p>{`- ${data?.author}`}</p>
          </div>
        )}
        <button type='button' onClick={loadData} disabled={isLoading}>
          refresh (spacebar)
        </button>
      </div>
    </main>
  )
}

export default Quotes
