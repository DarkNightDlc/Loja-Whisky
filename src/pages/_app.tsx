import { CartProvider } from '@/hook/cart'
import Layout from '../layout/Layout'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return(
    <CartProvider>
      <Layout>
          <Component {...pageProps} /> 
      </Layout>
    </CartProvider>
  )
}
