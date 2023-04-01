import { Component, OnInit } from '@angular/core';
import axios from 'axios';

interface ITransactions {
  hash: string;
  type: number;
  from: string;
  to: string;
  value: any;
  gasPrice: any;
  blockNumber: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor() {}

  latestBlock = "";
  transactions: ITransactions[] = [];

  async ngOnInit() {
    const { data } = await axios.get(`http://localhost:3000`);
  
    this.latestBlock = data.latestBlock;
    
    // we get the block transactions using data.transactions.transactions, 
    // based on the response structure noticed from console.log of response in server
    this.transactions = data.transactions.transactions;
    console.log(this.transactions);
    // let tx = this.transactions[0].gasPrice.hex.toString(10);
    // console.log(tx);
  }

  
  
}
