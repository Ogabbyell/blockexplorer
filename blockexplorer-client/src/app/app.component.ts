import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  {
  
  address = '';
  update(address: string) { 
    if (address) {
      this.address = address; 
      console.log(address);
    }
  }
}
