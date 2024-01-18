import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { UserEditComponent } from '@user/user-edit';
import { UserComponent } from './user.component';

const routes : Routes=[
    {path: 'users',component: UserComponent}
  ];
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class UserRoutingModule { }
  