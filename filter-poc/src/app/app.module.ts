import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonComponent } from './common/common.component';
import { ServiceComponent } from './services/service.component';
import { HeaderComponent } from './common/component/header/header.component';
import { FooterComponent } from './common/component/footer/footer.component';
import { SearchFilterComponent } from './common/ui-elements/search-filter/search-filter.component';
import { ChipsComponent } from './common/ui-elements/chips/chips.component';
import { MatChipsModule } from '@angular/material/chips';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TableComponent } from './common/ui-elements/table/table.component';
import { UserDataComponent } from './user-data/user-data.component';
import { MatTableModule } from '@angular/material/table';
import { HttpClientModule } from '@angular/common/http';
import { PaginatorComponent } from './common/ui-elements/paginator/paginator.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import { FiltersComponent } from './common/ui-elements/filters/filters.component';
import {  MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormatDataPipe } from './common/models/format';
import { ChipSetComponent } from './common/ui-elements/chip-set/chip-set.component';
import {MatMenuModule} from '@angular/material/menu';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card'
import { MatExpansionModule} from '@angular/material/expansion'

@NgModule({
  declarations: [
    AppComponent,
    CommonComponent,
    HeaderComponent,
    FooterComponent,
    SearchFilterComponent,
    ChipsComponent,
    TableComponent,
    UserDataComponent,
    PaginatorComponent,
    FiltersComponent,
    FormatDataPipe,
    ChipSetComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatChipsModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    HttpClientModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatMenuModule,
    MatDatepickerModule,
    FormsModule,
    MatCardModule,
    MatExpansionModule
  ],
  providers: [ServiceComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
