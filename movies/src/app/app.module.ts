import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { NavbarComponent } from './navbar/navbar.component';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import { DataService } from './service/data.service';
import { HttpClientModule } from '@angular/common/http';
import {MatExpansionModule} from '@angular/material/expansion';
import { MatDialogModule } from '@angular/material/dialog';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDividerModule} from '@angular/material/divider';


import * as animations from '@angular/platform-browser/animations';
import { ShowMovieComponent } from './show-movie/show-movie.component';
import { MoviesShowsComponent } from './movies-shows/movies-shows.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ShowVideosComponent } from './show-videos/show-videos.component';


@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    NavbarComponent,
    ShowMovieComponent,
    MoviesShowsComponent,
    MovieDetailsComponent,
    ShowVideosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    animations.BrowserAnimationsModule,
    MatIconModule,
    MatCardModule,
    HttpClientModule,
    MatExpansionModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    CarouselModule,
    MatDividerModule
    ],
  
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
