import React from 'react'

import styles from './styles.module.sass'

import { QuoteData } from 'modules/common/quotesSources'

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

export default Quote
