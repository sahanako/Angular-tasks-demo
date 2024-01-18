import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core'; 
import { MatRadioModule } from '@angular/material/radio'; 
import { MatCheckboxModule } from '@angular/material/checkbox';
import { UserListComponent } from './user-list/user-list.component';
import { UserComponent } from './user.component'; 
import { RouterModule } from '@angular/router';
import {  MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { UserRoutingModule } from './user-routing.module';
import {MatCardModule} from '@angular/material/card';
import { DatePipe } from '@angular/common';
import {MatDialogModule} from "@angular/material/dialog";
import {MatMenuModule} from '@angular/material/menu';
import {MatPaginatorModule} from '@angular/material/paginator';
import { FooterComponent } from './footer/footer.component';
import { FilterPageComponent } from './filter-page/filter-page.component';
import { MatSortModule } from '@angular/material/sort';
      import { MatChipsModule,MatChipInput } from '@angular/material/chips';

@NgModule({
  declarations: [
    UserListComponent,
    UserComponent,
    FooterComponent,
    FilterPageComponent
  ],
  
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatCheckboxModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    UserRoutingModule,
    MatCardModule,
    DatePipe,
    MatDialogModule,
    MatCardModule,
  MatDialogModule,
 MatMenuModule,
 MatPaginatorModule,
 MatSortModule,
 MatChipsModule
  ],
  // entryComponents: [
  //   DialogComponent,
  //   ]
  
  })


export class UserModule {


}
