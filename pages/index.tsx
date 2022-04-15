import type { NextPage } from 'next'
import dynamic from 'next/dynamic'
import Head from 'next/head'

const Quotes = dynamic(() => import('modules/quotes'), { ssr: false })

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Quotes Bytes</title>
        <meta name='description' content='Bang quotes' />
        {/* TODO: */}
        <link rel='icon' href='/favicon.ico' />
        <link rel='preload' href='/SinkinSans-400Italic.otf' as='font' crossOrigin='' />
        <link rel='preload' href='/SinkinSans-400Regular.otf' as='font' crossOrigin='' />
      </Head>
      <Quotes />
    </>
  )
}

export default Home
