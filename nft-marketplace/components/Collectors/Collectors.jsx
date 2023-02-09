import React from 'react'
import AppsIcon from '@mui/icons-material/Apps';
import TuneIcon from '@mui/icons-material/Tune';
import Card from '../UI/Card';
import classes from './Collectors.module.css'

const Collectors = () => {
  return (
    <>
      <h1 className={classes.creatorsh1}>Meet Our Great Creators</h1>
      <span className={classes.creatorspan}>
        <div>
          <AppsIcon/>
          <p>
            Category
          </p>
        </div>
        <div>
          <TuneIcon/>
          <p>
            Sort By
          </p>
        </div>
      </span>

      <section className={classes.creatorsection}>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
      </section>
    </>
  )
}

export default Collectors