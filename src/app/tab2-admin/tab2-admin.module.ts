import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Tab2AdminPageRoutingModule } from './tab2-admin-routing.module';

import { Tab2AdminPage } from './tab2-admin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Tab2AdminPageRoutingModule
  ],
  declarations: [Tab2AdminPage]
})
export class Tab2AdminPageModule {}
