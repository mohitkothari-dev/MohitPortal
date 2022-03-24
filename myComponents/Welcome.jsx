import React from 'react'
import styles from '../styles/Welcome.module.css'

const Welcome = () => {
  return (
    <div style={{ marginBottom: "25px"}} className={styles.welcome}>Hey Everyone <span className={styles.welcome__wave}>&#128075;</span> I am Mohit</div>
  )
}

export default Welcome