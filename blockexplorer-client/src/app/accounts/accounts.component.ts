import { Component, OnInit } from '@angular/core';
import axios from "axios";

interface IBalances {
  contractAddress: string;
  tokenBalance: string;
  balance: string;
  name: string;
  symbol: string
}

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent implements OnInit {
  constructor() {}
  
  address = "";
  balance = "";
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
    this.txnCount = data.txnCount;
    this.nftsOwned = data.nftsOwned;
    this.balances = data.nonZerobalances;  
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





