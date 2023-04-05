import { Component, OnInit } from '@angular/core';
import axios from "axios";

interface IBalances {
  contractAddress: string;
  tokenBalance: string;
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

  address = "";
  balance = "";
  // metadata: IMetadata[] = [];
  txnCount = "";
  nftsOwned = "";
  balances: IBalances[] = [];
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
    this.balances = data.balances;
    // this.metadata = data.metadata;
    
  }

  onTableDataChange(event: any) {
    this.page = event;
  }
  
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
  }
}
