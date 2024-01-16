import { Component, Input } from '@angular/core';
import { DataService } from '../service/data.service';
import { DialogData, moviesList } from '../model';
import { ActivatedRoute } from '@angular/router';
import { Result } from '../model'
import { ShowMovieComponent } from '../show-movie/show-movie.component';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {
  movies:moviesList[] = [];
  movieData:Result[]=[]
  movie:Result[]=[]
 genre: any;
 posterPath:any;
 genreDetails:any;
 panelOpenState = false;
 questions: string[] = [];
 private subscription?: Subscription;
  constructor(private service : DataService,private router:ActivatedRoute,private dialog: MatDialog){}
  ngOnInit(): void {

    this.service.getMovies().subscribe((data: any) => {
      this.movies = data.genres;
      console.log(this.movies);
      
      this.service.getMoviesByGenres().subscribe((res: any) => {
        this.genre = res.results;
        this.movies.forEach((movie: any) => {
          const matchingGenre = this.genre.find((genre: any) => genre.genre_ids.includes(movie.id));

          if (matchingGenre) {
             this.posterPath = 'https://image.tmdb.org/t/p/w185' + matchingGenre.poster_path;
            movie.posterPath = this.posterPath; 
            movie.genreDetails = matchingGenre           
            console.log("Movie Details:", movie.id, movie.name, "Poster Path:", this.posterPath);
          } else {
            console.log("No matching genre found for Movie:", movie.id, movie.name);
          }
        });
      });
    });
    
             
  } 

  
  //  getMovieById(id:number){
  //   this.service.getMoviesById(id).subscribe((data:any)=>{
  //     console.log(data);
  //   })
  //  }

   openTaskDialog() {
    /* 
      Creates your dialog modal
    */
    const dialogRef = this.dialog.open(ShowMovieComponent,{
    });

    /* 
      Handles what happens after the modal dialog is closed
    */
      // dialogRef.afterClosed().subscribe(result => {
      //   console.log('The dialog was closed');
      //   this.items = result;
      //   console.log(this.items);
        
      // });

      
    
      // constructor(private questionService: QuestionService) {
        this.subscription = this.service.questions$.subscribe((questions) => {
          this.questions = questions;
        });
      }
    
      ngOnDestroy(): void {
        this.subscription?.unsubscribe();
      }
  }

