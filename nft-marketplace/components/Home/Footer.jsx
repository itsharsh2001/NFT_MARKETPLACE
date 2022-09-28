import React from 'react'
import Link from 'next/link'
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';
import classes from './Footer.module.css';

function Footer() {
    return (
        <footer className={classes.footer}>
            <span>
                <h3>Enefty.</h3>
                <h2>Create, Explore & Collect Digital Art NFTs</h2>
            </span>
            <section>
                <ul>
                    <Link href='/'>
                        <li>PRIVACY POLICY</li>
                    </Link>
                    <Link href='/'>
                        <li>TERM & CONDITION</li>
                    </Link>
                    <Link href='/'>
                        <li>ABOUT US</li>
                    </Link>
                    <Link href='/'>
                        <li>FAQ</li>
                    </Link>
                </ul>
                <div>
                    <FacebookIcon className={classes.icon}/>
                    <YouTubeIcon className={classes.icon}/>
                    <InstagramIcon className={classes.icon}/>
                </div>
                <p>© 2021 ENEFTY INC. All Rights Reserved. </p>
            </section>
        </footer>
    )
}

export default Footer