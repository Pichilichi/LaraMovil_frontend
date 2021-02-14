import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Tab3AdminPage } from './tab3-admin.page';

const routes: Routes = [
  {
    path: '',
    component: Tab3AdminPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Tab3AdminPageRoutingModule {}
