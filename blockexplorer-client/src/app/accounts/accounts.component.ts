import { Component, OnInit } from '@angular/core';
import axios from "axios";

interface IBalances {
  contractAddress: string;
  tokenBalance: string;
  balance: string;
  name: string;
  symbol: string
}

// interface IMetadata {
//   decimals: number;
//   name: string;
//   symbol: string;
// }

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent implements OnInit {
  constructor() {}

  walletAddress = '';
  getAddress(walletAddress: string) { 
    if (walletAddress) {
      this.walletAddress = walletAddress; 
      console.log(walletAddress);
    }
    return walletAddress;
  };
  
  address = "";
  balance = "";
  // metadata: IMetadata[] = [];
  txnCount = "";
  nftsOwned = "";
  balances: IBalances[] = [];

  // pagination
  page: number = 1;
  count: number = 0;
  tableSize: number = 10;
  tableSizes: any = [3, 6, 9, 12];

  async ngOnInit() {
    const { data } = await axios(`http://localhost:3000/accounts`);
    this.address = data.walletAddress;
    this.balance = data.walletBalance;
    // this.balance = parseInt(data['balance'][0]["hex"], 16);
    // console.log(this.balance);
    this.txnCount = data.txnCount;
    this.nftsOwned = data.nftsOwned;
    this.balances = data.nonZerobalances;
    // this.metadata = data.metadata;
    
  }

  // pagination
  onTableDataChange(event: any) {
    this.page = event;
  }
  
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
  }
}

// const { data } = await axios.get(`http://localhost:3000/accounts`, {
//       params: {walletAddress: this.walletAddress}
//     });



