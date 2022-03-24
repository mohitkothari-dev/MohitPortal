import React from 'react'
import styles from '../styles/Message.module.css'

const Message = () => {
  return (
    <div  style={{ marginBottom: "25px", marginLeft: "10%", marginRight: "10%"}}>
    <div className={styles.message}>
        Send me some &#128151;  on Ethereum Blockchain!
    </div>
    <div className={styles.message}>        
        Else share some Web3, DAO, Blockchain, MetaVerse related news, articles, blogs, publications, hackathons, projects, project ideas, whitepaper, or anything else that comes to your mind, and you'll earn Ethers in return. Maybe an NFT also! Who knows.
    </div>
    </div>
  )
}

export default Message