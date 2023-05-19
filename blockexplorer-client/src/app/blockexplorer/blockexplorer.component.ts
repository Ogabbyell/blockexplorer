import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private router: Router) {}

  latestBlock = "";
  ethPrice = "";
  transactions: ITransactions[] = [];
  page: number = 1;
  count: number = 0;
  tableSize: number = 10;
  tableSizes: any = [3, 6, 9, 12];

  async ngOnInit() {
    const { data } = await axios.get(`http://localhost:3000`);
    
    this.ethPrice = data.ethPrice;
    this.latestBlock = data.latestBlock;
    
    // we get the block transactions using data.transactions.transactions, 
    // based on the response structure noticed from console.log of response in server
    this.transactions = data.transactions.transactions;
  }

  // Paginate table
  onTableDataChange(event: any) {
    this.page = event;
  }
  
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
  }

  // Get inputed wallet address
  walletAddress: string = "";
  async getAddress(walletAddress: string) { 
    if (walletAddress) {
      this.walletAddress = walletAddress; 
      console.log(walletAddress);
      this.router.navigate(['/accounts']);
      const { data } = await axios.post(`http://localhost:3000/send`, 
      {walletAddress: this.walletAddress}
      );
    }
    return walletAddress;
  };

  // Get selected Transaction Hash
  txHash: string = "";
  async getTxHash(event?: MouseEvent) {
    const txHash = event ? (event.target as HTMLElement).innerHTML : '';
    console.log(txHash);
    this.router.navigate(['/details']);
    const { data } = await axios.post(`http://localhost:3000/txnHash`, 
      {txHash: txHash}
    );
    return txHash;
  }
}
