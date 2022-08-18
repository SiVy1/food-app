import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {SessionProvider} from 'next-auth/react'
import '../styles/order.css'
function MyApp({ Component, pageProps }: AppProps, {session}: any) {
  return <SessionProvider session={session}>
    <Component {...pageProps} />
    </SessionProvider>
}

export default MyApp
