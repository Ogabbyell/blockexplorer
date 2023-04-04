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
  selector: 'app-blockexplorer',
  templateUrl: './blockexplorer.component.html',
  styleUrls: ['./blockexplorer.component.scss']
})
export class BlockexplorerComponent implements OnInit {

  constructor() {}

  latestBlock = "";
  transactions: ITransactions[] = [];
  page: number = 1;
  count: number = 0;
  tableSize: number = 10;
  tableSizes: any = [3, 6, 9, 12];

  async ngOnInit() {
    const { data } = await axios.get(`http://localhost:3000`);
  
    this.latestBlock = data.latestBlock;
    
    // we get the block transactions using data.transactions.transactions, 
    // based on the response structure noticed from console.log of response in server
    this.transactions = data.transactions.transactions;
    console.log(this.transactions);
  }

  onTableDataChange(event: any) {
    this.page = event;
  }
  
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
  }
}
