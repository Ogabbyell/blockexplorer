const express = require("express");
const app = express();
const port = 3000;
// Setup: npm install alchemy-sdk
const { Network, Alchemy } = require("alchemy-sdk");
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

const main = async () => {
  const latestBlock = await alchemy.core.getBlockNumber();
  console.log("The latest block number is", latestBlock);

  const transactions = await alchemy.core.getBlockWithTransactions(latestBlock);
  console.log(transactions); 

  // Get all outbound transfers for a provided address
  // const tokens = await alchemy.core.getTokenBalances('vitalik.eth');
  // console.log(tokens);
  
  
  // const tokenBalances = await alchemy.core.getTokenBalances(address);
  // const tokens = JSON.stringify(tokenBalances);
  
  // console.log("Token Balances: " + tokens);

  // Get all the NFTs owned by an address
  // alchemy.nft.getNftsForOwner('vitalik.eth').then(nfts => {
  //   console.log(nfts.totalCount);
  //   return nfts.totalCount;
  // });

  // Get all the image urls for all the NFTs an address owns.
  // for await (const nft of alchemy.nft.getNftsForOwnerIterator('vitalik.eth')) {
  //   console.log(nft.media);
  //   return nft.media;
  // };
  // const nftsBalances = await alchemy.nft.getNftsForOwner(address);
  // const nfts = JSON.stringify(nftsBalances);

  // console.log("NFTs owned by address" + nfts);

  // Listen to all new pending transactions
  // alchemy.ws.on(
  //   { method: "alchemy_pendingTransactions",
  //   fromAddress: address },
  //   (res) => console.log(res)
  // );

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
  
  // Get all outbound transfers for a provided address
  // const tokens = await alchemy.core.getTokenBalances('vitalik.eth');
  // console.log(tokens);
  
  
  // const tokenBalances = await alchemy.core.getTokenBalances(address);
  // const tokens = JSON.stringify(tokenBalances);
  
  // console.log("Token Balances: " + tokens);

  // Get all the NFTs owned by an address
  // alchemy.nft.getNftsForOwner('vitalik.eth').then(nfts => {
  //   console.log(nfts.totalCount);
  //   return nfts.totalCount;
  // });

  // Get all the image urls for all the NFTs an address owns.
  // for await (const nft of alchemy.nft.getNftsForOwnerIterator('vitalik.eth')) {
  //   console.log(nft.media);
  //   return nft.media;
  // };
  // const nftsBalances = await alchemy.nft.getNftsForOwner(address);
  // const nfts = JSON.stringify(nftsBalances);

  // console.log("NFTs owned by address" + nfts);

  // Listen to all new pending transactions
  // alchemy.ws.on(
  //   { method: "alchemy_pendingTransactions",
  //   fromAddress: address },
  //   (res) => console.log(res)
  // );

  return { latestBlock, transactions };
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
