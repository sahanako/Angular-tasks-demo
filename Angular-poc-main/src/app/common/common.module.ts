import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterComponent } from './filter/filter.component';
import { TableComponent } from './table/table.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { SearchFilterComponent } from './search-filter/search-filter.component';



@NgModule({
  declarations: [
    FilterComponent,
    TableComponent,
    FooterComponent,
    HeaderComponent,
    SearchFilterComponent
  ],
  imports: [
    CommonModule
  ]
})
export class CommonModule { }
