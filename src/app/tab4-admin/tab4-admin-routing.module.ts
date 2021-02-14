import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Tab4AdminPage } from './tab4-admin.page';

const routes: Routes = [
  {
    path: '',
    component: Tab4AdminPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Tab4AdminPageRoutingModule {}
