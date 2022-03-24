import React from 'react'
import styles from '../styles/Form.module.css'

const Form = ({ Links }) => {
  return (
    <div>
        <form className={styles.form} style={{ marginBottom: "25px" }}>
            <textarea rows={5} className={styles.form__textArea} placeholder="Enter anything that comes to your mind..." required/>
            <button type='submit' onClick={Links}>Submit</button>
        </form>
    </div>
  )
}

export default Form