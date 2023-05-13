import type { NextPage } from 'next'
import Link from 'next/link'
import WalletLoader from 'components/WalletLoader'
import { useSigningClient } from 'contexts/client'

const Home: NextPage = () => {
  const { walletAddress } = useSigningClient()

  return (
    // <WalletLoader>
    //   <h1 className="text-6xl font-bold">
    //     Welcome to {process.env.NEXT_PUBLIC_CHAIN_NAME} !
    //   </h1>

    //   <div className="mt-3 text-2xl">
    //     Your wallet address is:{' '}
    //     <pre></pre>
    //     <Link href={process.env.NEXT_PUBLIC_CHAIN_EXPLORER + "coreum/accounts/" + walletAddress} passHref>
    //       <a target="_blank" rel="noreferrer" className="font-mono break-all whitespace-pre-wrap link link-primary">
    //         {walletAddress}
    //       </a>
    //     </Link>

    //   </div>

    //   <div className="flex flex-wrap items-center justify-around max-w-4xl mt-6 max-w-full sm:w-full">
    //     <Link href="/nft" passHref>
    //       <a
    //         className="p-6 mt-6 text-left border border-secondary hover:border-primary w-96 rounded-xl hover:text-primary focus:text-primary-focus">
    //         <h3 className="text-2xl font-bold">NFT &rarr;</h3>
    //         <p className="mt-4 text-xl">
    //           Create you NFT class and mint NFTs for it.
    //         </p>
    //       </a>
    //     </Link>
    //   </div>


    // </WalletLoader>
  )
}

export default Home
