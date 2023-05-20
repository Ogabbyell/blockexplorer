# Ethereum Block Explorer (Crypto Surf)

Crypto surf is a basic Ethereum blockexplorer built with Angular 15 and Node.js 18. It is my Alchemy University week 3 assignment for the seven (7) weeks Ethereum Developer Bootcamp learning path.

The lessons this week (week 3) covered the Ethereum JSON-RPC API and the `ethers.js` library giving us the ability to query the Ethereum blockchain and make transactions!

That knowledge was put to the test by building my very own **Ethereum Block Explorer**!

Angular is used as the Frontend library for this assignment and will be of great use as a guide for Angular developers like me with little or no experience in Reactjs.

Blockexplorers give us the ability to view lots of different information about the blockchain including data about:
  * the blockchain network itself
  * blocks in the blockchain
  * transactions in a block
  * accounts
  * and many other things
  
[Etherscan](https://etherscan.io/) is a good example of an Ethereum blockexplorer. Check it out to get familiar with how blockexplorers generally work.

This particular project pulls down the transactions in the latest block when initialised. It also displays the current Ethereum price.
when a transaction hash is clicked, the details route is opened and the transaction reseipt for the selected hash is displayed.
A wallet address can also be lookedup using the search input. this opens an accounts page that displays the wallet address entered, the current balance in that address, total NFTs owned, total transactions count and details of the NFTs owned.

## Getting Started

get you 

Clone this project.

After that cd into the client folder and run `npm install` to download all the project dependencies and run using ng serve -o

Also cd into the server folder in a different terminal and run `npm install` to download all the project dependencies and then run using node index.js

This project uses the [AlchemySDK](https://docs.alchemy.com/reference/alchemy-sdk-quickstart?a=eth-bootcamp). The AlchemySDK's core package wraps almost all of the `ethers.js` provider functionality that we learned about and should feel very familiar to you. 

For example, the following `ethers.js` code
```js
const blockNumber = await provider.getBlockNumber();
```
can be written using the AlchemySDK like so:
```js
const blockNumber = await alchemy.core.getBlockNumber()
```
Another `ethers.js ` example
```js
const transcations = await provider.getBlockWithTransactions(SOME_BLOCK_NUMBER)
```
translates to
```js
const transactions = await alchemy.core.getBlockWithTransactions(SOME_BLOCK_NUMBER)
```
and so on.

There are some `ethers.js` provider functions that are not often-used and therefore not included in `alchemy.core`. But if you ever need the full ethers provider functionality you can access the provider directly with the following code:
```js
const ethersProvider = await alchemy.config.getProvider();
```

You can find lots of good docs on the AlchemySDK here:
  * [API Quickstart](https://docs.alchemy.com/reference/alchemy-sdk-quickstart?a=eth-bootcamp)
  * [API Overview](https://docs.alchemy.com/reference/api-overview?a=eth-bootcamp)

To get started!

## 1. Create a unique Alchemy API key

If you have not already done so, create a unique Alchemy API Mainnet key
for your project as [described here](https://docs.alchemy.com/reference/api-overview?a=eth-bootcamp).

## 2. Add your API key to as an environment variable for the project

Create an empty `.env` file in the base directory of this project.

In the `.env` paste ALCHEMY_API_KEY=`YOUR_ALCHEMY_API_KEY` replace `YOUR_ALCHEMY_API_KEY` with your api key (no curly braces needed).

**⚠️ Note**

> Your Alchemy API Mainnet Key is a sensitive piece of data. If we were\
> building an enterprise app to conquer the world we would never place\
> this sensitive data in the client code of our blockexplorer project that\
> could potentially be read by anyone.
>
> But hey, we're just learning this stuff right now, not conquering anything\
> yet! :-) It won't be the end of the world to put the Alchemy API key in our\
> front-end code for this project.

## Mentions

This Angular frontend was built out using the MDB 5 Angular starter kit from MDB Bootstrap as a starter front-end code. 
You can explore their docs from the links below:
MDB 5 Angular

Version: FREE 4.0.0

Documentation:
https://mdbootstrap.com/docs/b5/angular/

Installation:
https://mdbootstrap.com/docs/b5/angular/getting-started/installation/

CLI & hosting:
https://mdbootstrap.com/docs/standard/cli/

Support:
https://mdbootstrap.com/support/cat/angular/

Lots of thanks to Alchemy University for this great course. It has opened me to a whole new world that is the web3 space.

Have fun!