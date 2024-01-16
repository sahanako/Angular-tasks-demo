import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { PagesComponent } from './pages.component';
import { ComponentsDirective } from './pages/components.directive';


@NgModule({
  declarations: [
    PagesComponent,
    ComponentsDirective
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
