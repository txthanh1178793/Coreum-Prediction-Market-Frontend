import { useSigningClient } from 'contexts/client'
import Link from 'next/link'
import Image from 'next/image'
import Router from 'next/router'

function Nav() {
  const { walletAddress, connectWallet, disconnect } = useSigningClient()
  const handleConnect = () => {
    if (walletAddress.length === 0) {
      connectWallet()
    } else {
      disconnect()
      Router.push('/')
    }
  }


  return (
    <div className="border-b w-screen px-2 md:px-16">
      <nav
        className="flex flex-wrap text-center md:text-left md:flex flex-row w-full justify-between items-center py-4">
        <div className="flex items-center">
          <Link href="/">
            <a>
              <Image src="/DOM_Predict.svg" height={100} width={250} alt="Logo" />
            </a>
          </Link>
          {/* <Link href="/">
            <a className="ml-1 md:ml-2 link link-hover font-semibold text-xl md:text-2xl align-top">
              {process.env.NEXT_PUBLIC_SITE_TITLE}
            </a>
          </Link> */}
        </div>
        <div className="flex flex-grow lg:flex-grow-0 max-w-full">
          <button
            className="block btn btn-outline btn-primary w-full max-w-full truncate"
            onClick={handleConnect}
          >
            {walletAddress || 'Connect Wallet'}
          </button>
        </div>
      </nav>
    </div>
  )
}

export default Nav
