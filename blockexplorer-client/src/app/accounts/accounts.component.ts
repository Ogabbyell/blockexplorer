import { Component, OnInit } from '@angular/core';
import axios from "axios";

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent implements OnInit {
  constructor() {}

  address = "";
  nfts = "";
  tokens = "";
  latestBlock = "";

  async ngOnInit() {
    const { data } = await axios(`http://localhost:3000/accounts`);
  
    this.address = data.address;
    this.tokens = data.tokens;
    this.nfts = data.nfts;
    this.latestBlock = data.latestBlock;
  }
}
