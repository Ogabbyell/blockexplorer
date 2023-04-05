const express = require("express");
const app = express();
const port = 3000;
// Setup: npm install alchemy-sdk
const { Network, Alchemy, Utils } = require("alchemy-sdk");
const cors = require("cors");

require("dotenv").config({path:".env"});

// allow access to Angular app domain
app.use(
  cors({
    origin: "http://localhost:4200",
    credentials: true,
  })
);
app.use(express.json());

// Optional Config object, but defaults to demo api-key and eth-mainnet.
const settings = {
  apiKey: process.env.ALCHEMY_API_KEY, // Replace with your Alchemy API Key.
  network: Network.ETH_MAINNET, // Replace with your network.
};

const alchemy = new Alchemy(settings);
const walletAddress = "vitalik.eth";

const main = async () => {
  const latestBlock = await alchemy.core.getBlockNumber();
  // console.log("The latest block number is", latestBlock);

  const transactions = await alchemy.core.getBlockWithTransactions(latestBlock);
  // console.log(transactions); 

  // Listen to all new pending transactions
  alchemy.ws.on(
    { method: "alchemy_pendingTransactions",
    fromAddress: walletAddress },
    (res) => console.log(res)
  );

  return { latestBlock, transactions };
}

main();

app.get("/", async (req, res) => {
  try {
    // Get and return the current block data
    const data = await main();  // change this to block function
    res.status(200);
    res.json(data);
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500);
    res.json({ error: error.message });
  }
});

const account = async () => {

  let balance = await alchemy.core.getBalance(walletAddress, "latest");
  walletBalance = Utils.formatEther(balance);
  // console.log(walletAddress);
  // console.log("balance = " + walletBalance);

  let txnCount = await alchemy.core.getTransactionCount(walletAddress);
  // console.log("txnCount = " + txnCount);

  let nfts = await alchemy.nft.getNftsForOwner(walletAddress);

  let nftsOwned = nfts.totalCount;
  // console.log("nftsOwned= " + nftsOwned);
  
  // Get token balances
  const tokens = await alchemy.core.getTokenBalances('vitalik.eth');

  let balances = tokens.tokenBalances;

  // remove tokens with zero balances 
  let nonZerobalances = balances.filter((token) => {
    return token.tokenBalance !== "0";
  });
  // console.log(nonZerobalances);
  balances = nonZerobalances;
  // console.log(balances);

  // for (let token of balances) {
  //   // get balance of token
  //   let balance = token.tokenBalance;
    
  //    // get tokens metadada 
  //   let tokenMetadata = await alchemy.core.getTokenMetadata(token.contractAddress);

  //   // compute token balance in human readable format
  //   tokenBalance = balance / Math.pow(10, tokenMetadata.decimals);
  //   metadata = tokenMetadata;

  //   // console.log(metadata);
  // }

  // Listen to all new pending transactions
  alchemy.ws.on(
    { method: "alchemy_pendingTransactions",
    fromAddress: walletAddress },
    (res) => console.log(res)
  );

  return { walletAddress, walletBalance, txnCount, nftsOwned, balances };
}
account();


app.get("/accounts", async (req, res) => {
    try {
      // Get and return the crypto data
      const data = await account();
      res.status(200);
      res.json(data);
    } catch (error) {
      // Handle errors
      console.error(error);
      res.status(500);
      res.json({ error: error.message });
    }
  });

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
