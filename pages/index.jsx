import {useState,useEffect} from 'react'
import { ethers } from 'ethers'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Connection from '../myComponents/Connection'
import Message from '../myComponents/Message'
import Welcome from '../myComponents/Welcome'
import Form from '../myComponents/Form'
import abi from '../utils/LinkPortal.json'

export default function Home() {

  const [currentAccount, setCurrentAccount] = useState("");

  const [allLinks, setAllLinks] = useState([]);
  const contractAddress = "0xB932b74A63bf4AeAA35Ee7E7448308b15cC1A604";
  const contractABI = abi.abi;

  //a method that gets all links from contract
  const getAllLinks = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const LinkProtalContract = new ethers.Contract(contractAddress, contractABI, signer);

        //call getallwaves method from smart contract
        const links = await LinkProtalContract.getAllLinks();
        console.log(links);

        let linksCleaned = [];
        links.forEach(link => {
          linksCleaned.push({
            address: link.sender,
            timestamp: new Date(link.timestamp*1000),
            message: link.message
          })
        })
        setAllLinks(linksCleaned);
      }
    } catch (error) {
      console.log(error);
    }
  }
  
  const checkIfWalletisConnected = async () => {
    const { ethereum } = window;
    try {
      if (!ethereum) return alert("Please install any Ethereum Wallet");

      /*
       * Check if we are authorized to use user's wallet 
       */
      const accounts = await ethereum.request({ method: 'eth_accounts' });

      if(accounts.length) {
        const account = accounts[0];
        console.log("Found an authorized account:",account);
        setCurrentAccount(account);
        getAllLinks();
      } else {
        console.log("No auhorized account found");
      }
    } catch (error) {
      console.log(error);
    }
  }

  const connectWallet = async (e) => {
    e.preventDefault();
    const { ethereum } = window;
    try {
      if (!ethereum) return alert("Please install any Ethereum Wallet");

      const accounts = await ethereum.request({ method: "eth_requestAccounts" });

      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  }

  const Links = async (e) => {
    e.preventDefault();
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const LinkProtalContract = new ethers.Contract(contractAddress, contractABI, signer);

        let count  = await LinkProtalContract.getTotalCount();
        console.log("Total counts: ", count.toNumber())
        /*
         * Execute the actual functions from smart contract 
         */
        const linkTxn = await LinkProtalContract.link("This is a message!");
        console.log("Mining...", linkTxn.hash);

        await linkTxn.wait();
        console.log("Mined: ", linkTxn.hash);

        count = await LinkProtalContract.getTotalCount();
        console.log("Total counts: ", count.toNumber())
      } else {
        console.log("Ethereum object doesn't exists!");
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    checkIfWalletisConnected();
  }, [])
  

  return (
    <div>
      <Head>
        <title>Mohit's Portal - Share some info</title>
        <meta name="description" content="Share some web3, DAO, blockchain related information and you will earn Ehers in return and some lucky ones amy earn nfts also." />
        <link rel="icon" href="/favicon.ico" />
        <style>@import url('https://fonts.googleapis.com/css2?family=Montserrat+Alternates:wght@100;200;300;400;500;600;700;800;900&display=swap');</style>
      </Head>
      <div className={styles.home}>
        <Welcome></Welcome>
        <Message></Message>
        {!currentAccount ?
        <Connection connectWallet={connectWallet}></Connection>
        :
        <Form Links={Links}></Form>
        }
        {allLinks.map((link,index) => {
          return (
            <div className={styles.card} key={index}>
                <div className={styles.card__col1}>
                  <div className={styles.card__col__heading}>Sender</div>
                  <div>{link.address}</div>
                </div>
                <div className={styles.card__col2}>
                  <div className={styles.card__col__heading}>Message</div>
                  <div>{link.message}</div>
                </div>
                <div className={styles.card__col3}>
                  <div className={styles.card__col__heading}>Time</div>
                  <div>{link.timestamp.toString()}</div>
                </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
