import React from 'react'
import classes from './Connect.module.css'
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

function Connect() {
  return (
    <main className={classes.connectwallet}>
      <h1>Connect To Wallet</h1>
      <p>Select the wallet list below, then scan the qr code that appears using your cellphone.</p>

      <div>
        <span>
          <img src="/metamask-icon.svg" />
          Metamask
        </span>
        <ChevronRightIcon/>
      </div>
      <div>
        <span>
        <img src="/coinbase.svg" />
          Coinbase Wallet
        </span>
        <ChevronRightIcon/>
      </div>
      <div>
        <span>
        <img src="walletconnect.svg" />
          Wallet Connect
        </span>
        <ChevronRightIcon/>
      </div>
      <div>
        <span>
        <img src="Fortmatic-icon.svg" />
          Formatic
        </span>
        <ChevronRightIcon/>
      </div>

    </main>
  )
}

export default Connect