import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountsComponent } from './accounts/accounts.component';
import { BlockexplorerComponent } from './blockexplorer/blockexplorer.component';

const routes: Routes = [
  { path: '', component: BlockexplorerComponent},
  { path: 'accounts', component: AccountsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
