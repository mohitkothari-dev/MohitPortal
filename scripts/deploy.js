const main = async () => {
    const [deployer] = await hre.ethers.getSigners();
    const accountBalance = await deployer.getBalance();

    console.log("Deploying contracts with account:", deployer.address);
    console.log("Account Balance:",accountBalance.toString());

    const linkContractFactory = await hre.ethers.getContractFactory("LinkPortal");
    const linkContract = await linkContractFactory.deploy({
      value: hre.ethers.utils.parseEther("1.0"),
    });
    await linkContract.deployed();

    console.log("MohitPortal address: ", linkContract.address);
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