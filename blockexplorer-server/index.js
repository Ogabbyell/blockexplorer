const express = require("express");
const app = express();
const port = 3000;
// Setup: npm install alchemy-sdk
const { Network, Alchemy, Utils } = require("alchemy-sdk");
const cors = require("cors");
const axios = require('axios');

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
  apiKey: process.env.ALCHEMY_API_KEY, 
  network: Network.ETH_MAINNET, 
};

const alchemy = new Alchemy(settings);

const main = async () => {
  // get current eth price
  let price = await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=ethereum');
  
  price = Object.assign({}, price.data);
  const ethPrice = Number(price[0].current_price);
  // console.log(ethPrice);
  
  // get latest block in the ethereum blockchain
  const latestBlock = await alchemy.core.getBlockNumber();
  
  // get all transactions on the latest block 
  const transactions = await alchemy.core.getBlockWithTransactions(latestBlock);

  return { latestBlock, transactions, ethPrice };
}


app.get("/", async (req, res) => {
  try {
    // Get and return the current block data
    const data = await main();  // call the block function above
    res.status(200);
    res.json(data);
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500);
    res.json({ error: error.message });
  }
});

// get search walletAddress from frontend
app.post("/send", (req, res) => {
  walletAddress  = req.body.walletAddress;
  return walletAddress;
});

const account = async () => {
  // get balance of walletAddress entered 
  let balance = await alchemy.core.getBalance(walletAddress, "latest");
  // format the response 
  walletBalance = Number(Utils.formatEther(balance)).toFixed(4);
  
  // get transactions count for address
  let txnCount = await alchemy.core.getTransactionCount(walletAddress);
  
  // get total number of NFTs owned by the walletAddress
  let nfts = await alchemy.nft.getNftsForOwner(walletAddress);

  let nftsOwned = nfts.totalCount;
  // console.log("nftsOwned= " + nftsOwned);
  
  // Get token balances
  const balances = await alchemy.core.getTokenBalances(walletAddress);

  // remove tokens with zero balances 
  const nonZerobalances = balances.tokenBalances.filter((token) => {
    return token.tokenBalance !== "0";
  });

  for (let token of nonZerobalances) {
    // get balance of token
    let balance = token.tokenBalance;

    //  get metadata of token
    const metadata = await alchemy.core.getTokenMetadata(token.contractAddress); 
    // get token balance for each token
    token.balance = Number(balance / Math.pow(10, metadata.decimals)).toFixed(2);
    //  get name of each token
    token.name = metadata.name;
    // get symbol of each token
    token.symbol = metadata.symbol;
  }

 
  // nonZerobalances.forEach(async (token, index) => {
  //   // get balance of token
  //   let balance = token.tokenBalance;
  //   const metadata = await alchemy.core.getTokenMetadata(token.contractAddress); 
  //   token.balance = Number(balance / Math.pow(10, metadata.decimals)).toFixed(2);
  //   token.name = metadata.name;
  //   token.symbol = metadata.symbol;
  
  //   console.log(nonZerobalances);
  // });

  // Listen to all new pending transactions
  alchemy.ws.on(
    { method: "alchemy_pendingTransactions",
    fromAddress: walletAddress },
    (res) => console.log(res)
  );

  return { walletAddress, walletBalance, txnCount, nftsOwned, nonZerobalances};
};


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

app.post("/txnHash", async (req, res) => {
  txHash = req.body.txHash;
  // console.log(txHash);
  return txHash;
});

const txnDetails = async () => {
  //Initialize variables for the parameters
  const tx =  txHash;

  //Call the method to fetch the transaction receipt of the tx
  let response = await alchemy.core.getTransactionReceipt(tx);

  // console.log(response);

  return { response };
};

app.get("/details", async (req, res) => {
  try {
    // Get and return the crypto data
    const data = await txnDetails();
    res.status(200);
    res.json(data);
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500);
    res.json({ error: error.message });
  }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
