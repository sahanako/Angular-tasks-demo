import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login/login.component';
import { FormsModule } from '@angular/forms';
import { UserModule } from './user/user.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import{ HttpClientModule } from '@angular/common/http'

import { LoginModule } from './login/login/login.module';
import { UserService } from './user.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    FormsModule,
    UserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    LoginModule

  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
