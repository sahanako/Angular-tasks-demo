import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { UserAddComponent } from './user-add/user-add.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core'; 
import { MatRadioModule } from '@angular/material/radio'; 
import { MatCheckboxModule } from '@angular/material/checkbox';
import { UserListComponent } from './user-list/user-list.component';
import { UserComponent } from './user.component'; 
import { RouterModule } from '@angular/router';
import { UserEditComponent } from './user-edit/user-edit.component';
import {  MatTableModule } from '@angular/material/table';
import { UserDetailsComponent } from './user-details/user-details.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { UserRoutingModule } from './user-routing.module';
import {MatCardModule} from '@angular/material/card';
import { DatePipe } from '@angular/common';
import { ErrorhandlingComponent } from './errorhandling/errorhandling.component';
import {MatDialogModule} from "@angular/material/dialog";
import { DialogComponent } from './dialog/dialog.component';
import { SharedModule } from '../shared/shared.module';
import {MatMenuModule} from '@angular/material/menu';
import {MatPaginatorModule} from '@angular/material/paginator';
import { FooterComponent } from './footer/footer.component';
import { FilterPageComponent } from './filter-page/filter-page.component';
import { MatSortModule } from '@angular/material/sort';
      import { MatChipsModule,MatChipInput } from '@angular/material/chips';

@NgModule({
  declarations: [
    UserAddComponent,
    UserListComponent,
    UserComponent,
    UserEditComponent,
    UserDetailsComponent,
    UserEditComponent,
    ErrorhandlingComponent,
    DialogComponent,
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
 SharedModule,
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
