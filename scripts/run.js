const main = async () => {
    const [owner, randomPerson] = await hre.ethers.getSigners();
    const linkContractFactory = await hre.ethers.getContractFactory("LinkPortal");
    const linkContract = await linkContractFactory.deploy({
      value: hre.ethers.utils.parseEther("1.0"),
    });
    await linkContract.deployed();

    console.log("Contract deployed to:",linkContract.address);
    console.log("Contract deployed by:",owner.address);


    let linkCount;
    linkCount = await linkContract.getTotalCount();
    console.log(linkCount.toNumber());

    /*
    * Get contract balance 
    */
    let contractBalance = await hre.ethers.provider.getBalance(linkContract.address);
    console.log("Contract Balance:", hre.ethers.utils.formatEther(contractBalance));

    /*
    * Let's send a few links 
    */

    let linkTxn = await linkContract.link("A message!");
    await linkTxn.wait();

    /*
     * Get contract balance to see what happened! 
    */
   contractBalance = await hre.ethers.provider.getBalance(linkContract.address);
   console.log("Contract Balance:", hre.ethers.utils.formatEther(contractBalance));

   let allLinks = await linkContract.getAllLinks();
   console.log(allLinks);
}

const runMain = async () => {
    try {
      await main();
      process.exit(0); // exit Node process without error
    } catch (error) {
      console.log(error);
      process.exit(1); // exit Node process while indicating 'Uncaught Fatal Exception' error
    }
  };
  
  runMain();