import type { NextPage } from 'next'
import Link from 'next/link'
import WalletLoader from 'components/WalletLoader'
import CurrentBet from "components/CurrentBet";
import { useSigningClient } from 'contexts/client'
import PredictContextProvider from 'contexts/PredictContextProvider';


const Home: NextPage = () => {
  // const { walletAddress } = useSigningClient()

  return (
    <PredictContextProvider>
      <CurrentBet></CurrentBet>
    </PredictContextProvider>
  )
}

export default Home
