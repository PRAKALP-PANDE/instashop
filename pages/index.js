import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div>
      <Head>
        <title>Instashop.com - Your instant shop</title>
        <meta name="description" content="Insashop: Created by Prakalp Pande" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      This is instashop
      <div className="mx-4">This is mx4</div>
    </div>
  )
}
