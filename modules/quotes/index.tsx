import React, { useCallback, useEffect, useRef, useState } from 'react'

import Quote from './quote'
import styles from './styles.module.sass'

import { getQuote, QuoteData } from 'modules/common/quotesSources'
import { useKeyPress, useToggler } from 'modules/hooks'

import classNames from 'classnames'
import Image from 'next/image'
import { BiSpaceBar } from 'react-icons/bi'
import { RiRefreshLine } from 'react-icons/ri'

const Quotes = () => {
  const [data, setData] = useState<QuoteData>()
  const [isLoading, toggleLoading] = useToggler()
  const mustFetchData = useRef(true)
  const spaceBarPress = useKeyPress(' ')
  const isDeviceMobile = 'ontouchstart' in document.documentElement

  const loadData = useCallback(() => {
    toggleLoading()
    getQuote().then(setData).finally(toggleLoading)
  }, [toggleLoading])

  useEffect(() => {
    if (spaceBarPress || mustFetchData.current) {
      loadData()
      mustFetchData.current = false
    }
  }, [loadData, spaceBarPress])

  return (
    <>
      <div className={styles.logo_wrapper}>
        <Image
          src='/logo/transparent.svg'
          alt='transparent logo'
          layout='responsive'
          width='200'
          height='200'
          priority
        />
      </div>
      <main className={styles.main}>
        <Quote isLoading={isLoading} data={data} />
        <button
          type='button'
          className={styles.refresh_button}
          onClick={() => loadData()}
          disabled={isLoading}
          title={isDeviceMobile ? 'refresh' : 'press spacebar'}
        >
          <RiRefreshLine className={classNames({ [styles.rotating]: isLoading })} />
          {!isDeviceMobile && <BiSpaceBar />}
        </button>
      </main>
    </>
  )
}

export default Quotes
