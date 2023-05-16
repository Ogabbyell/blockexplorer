import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';

// interface ITransaction {
//   to: string;
//   from: string;
//   contractAddress: string;
//   transactionIndex: number;
//   gasUsed: any;
//   blockHash: string;
//   transactionHash: string;
//   blockNumber: number;
//   confirmations: number;
//   status: number;
//   type: number;
//   byzantium: boolean;
// }

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  constructor(private router: Router) {}

  to = '';
  from = '';
  contractAddress = '';
  transactionIndex = '';
  gasUsed = '';
  blockHash = '';
  transactionHash = '';
  blockNumber = '';
  confirmations = '';
  status = '';
  type = '';
  byzantium  = '';

  // transaction: ITransaction[] = [];

  async ngOnInit() {
    const { data } = await axios.get(`http://localhost:3000/details`);
    console.log(data.response.transactionHash);
    this.transactionHash = data.response.transactionHash;
    this.to = data.response.to;
    this.from = data.response.from;
    this.contractAddress = data.response.contractAddress;
    this.transactionIndex = data.response.transactionIndex;
    this.gasUsed = data.response.gasUsed.hex;
    this.blockHash = data.response.blockHash;
    this.blockNumber = data.response.blockNumber;
    this.confirmations = data.response.confirmations;
    this.status = data.response.status;
    this.type = data.response.type;
    this.byzantium = data.response.byzantium;
  }
}
