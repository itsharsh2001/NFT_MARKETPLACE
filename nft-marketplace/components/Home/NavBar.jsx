import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
import classes from './NavBar.module.css'
import Link from 'next/link';

function NavBar() {
  return (
    <nav className={classes.nav}>
        <h6>Enefty.</h6>
        <ul>
            <Link href='/'>
                <li>DISCOVER</li>
            </Link>
            <Link href='/'>
                <li>CREATORS</li>
            </Link>
            <Link href='/'>
                <li>COLLECTORS</li>
            </Link>
            <Link href='/'>
                <li>STATS</li>
            </Link>
        </ul>
        <span>
            <input type="text" placeholder='Search Artwork/Creator Name' />
            <SearchIcon className={classes.icon}/>
        </span>
        <button>Connect Wallet</button>
    </nav>
  )
}

export default NavBar