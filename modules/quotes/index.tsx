import React, { useCallback, useEffect, useRef, useState } from 'react'

import Quote from './quote'
import styles from './styles.module.sass'

import { getQuote, QuoteData, QuoteKind, QUOTE_KINDS } from 'modules/common/quotesSources'
import { useKeyPress, useToggler } from 'modules/hooks'

import classNames from 'classnames'
import Image from 'next/image'
import { BiSpaceBar } from 'react-icons/bi'
import { RiRefreshLine, RiSwapBoxLine } from 'react-icons/ri'

function Quotes() {
  const [data, setData] = useState<QuoteData>()
  const [byteKind, setByteKind] = useState<QuoteKind>('programming')
  const [isKindMenuOpen, toggleKindMenuOpen] = useToggler()
  const [isLoading, toggleLoading] = useToggler()
  const mustFetchData = useRef(true)
  const spaceBarPress = useKeyPress(' ')
  const isDeviceMobile = 'ontouchstart' in document.documentElement

  const loadData = useCallback(
    (kind: QuoteKind) => {
      toggleLoading()
      getQuote(kind).then(setData).finally(toggleLoading)
    },
    [toggleLoading]
  )

  useEffect(() => {
    if (spaceBarPress || mustFetchData.current) {
      loadData(byteKind)
      mustFetchData.current = false
    }
  }, [byteKind, loadData, spaceBarPress])

  return (
    <>
      {isKindMenuOpen && (
        <div className={styles.choose_kind_menu}>
          {QUOTE_KINDS.map((kind) => (
            <button
              key={kind}
              type='button'
              className={styles.choose_kind_menu_button}
              onClick={() => (setByteKind(kind), loadData(kind), toggleKindMenuOpen())}
            >
              {kind}
            </button>
          ))}
        </div>
      )}
      <button className={styles.open_kind_menu_button} type='button' onClick={toggleKindMenuOpen}>
        <RiSwapBoxLine />
      </button>

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
          onClick={() => loadData(byteKind)}
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
