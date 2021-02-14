import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Tab4AdminPageRoutingModule } from './tab4-admin-routing.module';

import { Tab4AdminPage } from './tab4-admin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Tab4AdminPageRoutingModule
  ],
  declarations: [Tab4AdminPage]
})
export class Tab4AdminPageModule {}
