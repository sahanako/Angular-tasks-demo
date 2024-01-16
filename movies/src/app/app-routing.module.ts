import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ShowMovieComponent } from './show-movie/show-movie.component';
import { MoviesShowsComponent } from './movies-shows/movies-shows.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { ShowVideosComponent } from './show-videos/show-videos.component';

const routes: Routes = [
  {
    path:'home',component:HomePageComponent
  },
  {
    path:'navbar',component:NavbarComponent
  },
  {
    path:'movie',component:MoviesShowsComponent
  },
  {
    path:'tv',component:MoviesShowsComponent
  },
  {
    path:'tv/:id',component:MovieDetailsComponent
  },
  {
    path:'movie/:id',component:MovieDetailsComponent
  },
  {
    path:'movie/video/:id',component:ShowVideosComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
