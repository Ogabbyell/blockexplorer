import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountsComponent } from './accounts/accounts.component';
import { BlockexplorerComponent } from './blockexplorer/blockexplorer.component';
import { DetailsComponent } from './details/details.component';


const routes: Routes = [
  { path: '', component: BlockexplorerComponent},
  { path: 'accounts', component: AccountsComponent},
  { path: 'details', component: DetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
