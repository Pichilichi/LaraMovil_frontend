import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsAdminPage } from './tabs-admin.page';

const routes: Routes = [
  {
    path: '',
    component: TabsAdminPage,
    children: [
      {
        path: 'Usuarios',
        loadChildren: () => import('../tab1-admin/tab1-admin.module').then(m => m.Tab1AdminPageModule)
      },
      {
        path: 'tab2',
        loadChildren: () => import('../tab2-admin/tab2-admin.module').then(m => m.Tab2AdminPageModule)
      },
      {
        path: 'tab3',
        loadChildren: () => import('../tab3-admin/tab3-admin.module').then(m => m.Tab3AdminPageModule)
      },
      {
        path: 'tab4',
        loadChildren: () => import('../tab4-admin/tab4-admin.module').then(m => m.Tab4AdminPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs-admin/Usuarios',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsAdminPageRoutingModule {}
