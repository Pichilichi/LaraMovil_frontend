import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Tab3AdminPageRoutingModule } from './tab3-admin-routing.module';

import { Tab3AdminPage } from './tab3-admin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Tab3AdminPageRoutingModule
  ],
  declarations: [Tab3AdminPage]
})
export class Tab3AdminPageModule {}
