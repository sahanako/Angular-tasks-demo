import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { DataService } from '../service/data.service';
import { Root } from '../model';
import { ActivatedRoute, Route, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-movies-shows',
  templateUrl: './movies-shows.component.html',
  styleUrls: ['./movies-shows.component.css']
})
export class MoviesShowsComponent {
  moviesDetails: Root[] = []
  movies: any;
  trendingMovies: any
  airshow: any;
  shows: boolean = false;
  showmovies?: boolean;
  //  @Output() showsChanged = new EventEmitter<boolean>();

  constructor(private service: DataService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {


    const type = this.route.snapshot.url[0].path;
    console.log(type);
    if (type === 'movie') {
      // //now playing movies
      //     this.service.getNowPlayingMovies(type)?.subscribe((res:any)=>{
      //       this.movies = res.results.map((res : {})=>res)
      //       console.log(this.movies);

      //       for(let i=0;i<this.movies.length;i++){
      //         // console.log(this.movies[i]);
      //       }

      //     });
    }


    //toprated movie and show
    this.service.getTopRatedMovies(type).subscribe((data: any) => {
      this.trendingMovies = data.results.map((data: {}) => data)
      // console.log(this.trendingMovies);
    })

    //popular movie and show
    this.service.getPopularshows(type).subscribe((res: any) => {
      this.airshow = res.results.map((res: {}) => res)
    })

  }

  selectedTab?: string
  navigate(data: any) {
    this.selectedTab = data
    const data1 = this.router.navigate([this.selectedTab]);
  }

}
