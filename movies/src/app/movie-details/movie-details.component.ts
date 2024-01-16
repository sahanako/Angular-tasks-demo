import { ChangeDetectorRef, Component, Input, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../service/data.service';
import { Root } from '../model';
import { DomSanitizer } from '@angular/platform-browser';
import { ChangeDetectionStrategy } from '@angular/core';
import { MoviesShowsComponent } from '../movies-shows/movies-shows.component';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent {
  limit: number = 10; // <==== Edit this number to limit API results
  customOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    center: true,
    dots: false,
    autoHeight: true,
    autoWidth: true,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 1,
      },
      1000: {
        items: 1,
      }
    }
  }
  arrayLength = 10
movieid:any;
movieData?:any
movieCast?:any
movie?:any
reviews?:any
  movieGenre: any;
  genre:any;
  sanitize: any;
  // @ViewChild('shows') shows?: MoviesShowsComponent;
  @Input() shows?: boolean;
  tvshows: any;
  movieCrew: any;
  constructor(private router:ActivatedRoute,private service:DataService,private sanitizer:DomSanitizer,private cdr:ChangeDetectorRef,private route:Router){
  }
 

  getArray(count: number) {
    return new Array(count)
  }
  ngOnInit(){
    this.router.params.forEach((params: any) => {
      this.movieid = params['id']
      console.log(params['id']);
    });
    const type = this.router.snapshot.url[0].path;
    console.log(type);

    console.log(this.movieid);

    this.service.getdetails(type,this.movieid).subscribe((res:any)=>{
      // this.movie = res.map((res:{})=>res)
      this.movieData = res      
    })


    this.service.getMovieCast(this.movieid)?.subscribe((item:any)=>{
      this.movieCast = item.cast
      .filter((castmember: { known_for_department: string; })=>castmember.known_for_department)
      .map((filterCastMember: any) => filterCastMember)
      
      this.movieCrew = item.crew.filter((castmember: { known_for_department: string; })=>castmember.known_for_department)
      .map((filterCastMember: any) => filterCastMember)
      console.log(this.movieCrew);

    })

    
    this.service.getReviews(this.movieid).subscribe((res:any)=>{
      this.reviews= res.results.map((author: { author_details: any; })=>author)
      console.log(this.reviews);
      
      this.sanitize =  this.sanitizer. bypassSecurityTrustHtml(res.results.map((author: { content: any; })=>author.content))
      console.log(this.sanitize)
    }) 
     
  }
  
  
}
