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
  apiKey: process.env.ALCHEMY_API_KEY, // Replace with your Alchemy API Key.
  network: Network.ETH_MAINNET, // Replace with your network.
};

const alchemy = new Alchemy(settings);
const walletAddress = "vitalik.eth";

let key = process.env.COINMARKET_API_KEY;

const main = async () => {
  let price = await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=ethereum');
  // price = Object.assign({}, ...(price.map(item => ({ [item.key]: item.value }) )));
  price = Object.assign({}, price.data);
  const ethPrice = Number(price[0].current_price);
  console.log(ethPrice);
  // get current price of ethereum
  // const price = await axios.get("https://pro-api.coinmarketcap.com/currencies/ethereum/");
  // console.log(price);

  // let response = null;
  // new Promise(async (resolve, reject) => {
  //   try {
  //     response = await axios.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?id=1027', {
  //       headers: {
  //         'X-CMC_PRO_API_KEY': key,
  //       },
  //     });
  //   } catch(ex) {
  //     response = null;
  //     // error
  //     console.log(ex);
  //     reject(ex);
  //   }
  //   if (response) {
  //     // success
  //     const price = response.data;
  //     // console.log(price);
  //     // resolve(price);
  //     return price;
  //   }
  // });



// let config = {
//   method: 'get',
//   maxBodyLength: Infinity,
//   url: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?id=1027',
//   headers: { 
//     'X-CMC_PRO_API_KEY': key, 
//     'Accept': '*/*'
//   }
// };

// let price = axios.request(config)
//             .then((response) => {
//               console.log(JSON.stringify(response.data.data));
//             })
//             .catch((error) => {
//               console.log(error);
//             });




  const latestBlock = await alchemy.core.getBlockNumber();
  // console.log("The latest block number is", latestBlock);
  // console.log(ethPrice);

  const transactions = await alchemy.core.getBlockWithTransactions(latestBlock);
  // console.log(transactions); 

  // Listen to all new pending transactions
  alchemy.ws.on(
    { method: "alchemy_pendingTransactions",
    fromAddress: walletAddress },
    (res) => console.log(res)
  );

  return { latestBlock, transactions, ethPrice };
  // ethPrice
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
  walletBalance = Number(Utils.formatEther(balance)).toFixed(4);
  // console.log(walletAddress);
  // console.log("balance = " + walletBalance);

  let txnCount = await alchemy.core.getTransactionCount(walletAddress);
  // console.log("txnCount = " + txnCount);

  let nfts = await alchemy.nft.getNftsForOwner(walletAddress);

  let nftsOwned = nfts.totalCount;
  // console.log("nftsOwned= " + nftsOwned);
  
  // Get token balances
  const balances = await alchemy.core.getTokenBalances(walletAddress);

  // let balances = tokens.tokenBalances;

  // remove tokens with zero balances 
  const nonZerobalances = balances.tokenBalances.filter((token) => {
    return token.tokenBalance !== "0";
  });
  // console.log(nonZerobalances);

  for (let token of nonZerobalances) {
    // get balance of token
    let balance = token.tokenBalance;

    //  get metadata of token
    const metadata = await alchemy.core.getTokenMetadata(token.contractAddress); 
    token.balance = Number(balance / Math.pow(10, metadata.decimals)).toFixed(2);
    token.name = metadata.name;
    token.symbol = metadata.symbol;

    // console.log(nonZerobalances);
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
