import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserAddComponent } from './user-add/user-add.component';
import { UserDetailsComponent } from '@user/user-details';
// import { UserEditComponent } from '@user/user-edit';
import { UserComponent } from './user.component';
import { ErrorhandlingComponent } from './errorhandling/errorhandling.component';

const routes : Routes=[
    {path: 'users',component: UserComponent},
    { path: 'user/data/:id', component: UserDetailsComponent },
    {path:'user/add',component:UserAddComponent},
        {path:'user/user-edit/:id',component:UserAddComponent},
        {path:'**',component:ErrorhandlingComponent}

  ];
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class UserRoutingModule { }
  