import Quotes from 'modules/quotes'

import type { NextPage } from 'next'
import Head from 'next/head'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Quotes Bytes</title>
        <meta name='description' content='Bang quotes' />
        {/* TODO: */}
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Quotes />
    </>
  )
}

export default Home
