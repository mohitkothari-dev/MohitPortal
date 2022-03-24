import React from 'react'

const Connection = ({connectWallet}) => {

  return (
    <div style={{ marginBottom: "25px" }}>
        <button type="submit" onClick={connectWallet} >Connect Wallet</button>
    </div>
  )
}

export default Connection