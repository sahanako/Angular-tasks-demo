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
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent {
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
  movielang: any;
  videos: any;
  safeURL: any;
  movieseasons: any;
  seasonNumbers: any;
  seasondetails: any;
  episodedetails: any;
  allSeasonDetails: any[] = [];

  constructor(private router:ActivatedRoute,private service:DataService,private sanitizer:DomSanitizer,private cdr:ChangeDetectorRef,private route:Router){
    const videoURL = 'https://www.youtube.com/embed?v=Ma1-sIoZnMs'
    this.safeURL = this.sanitizer.bypassSecurityTrustResourceUrl(videoURL);

  }


  customOptions: OwlOptions = {
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    margin:20,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 3
      },
      740: {
        items: 4
      },
      940: {
        items: 5
      }
    },
    nav: false
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
      this.movieGenre = res.genres
      this.movielang = res.spoken_languages
      this.movieseasons = res.seasons
      console.log(this.movieseasons.season_number);
      
       if(type === 'tv'){
        console.log("type is tv");
        this.seasonNumbers = this.movieseasons.map((season: { season_number: any; }) => season.season_number);
        console.log(this.seasonNumbers);
        this.seasonNumbers.forEach((seasonNumber: any) => {
          this.service.getSeasonDetails(this.movieid, seasonNumber).subscribe((res: any) => {
            this.allSeasonDetails.push(res);
              console.log(this.allSeasonDetails);
            
            // this.seasondetails.forEach((episode: any) => {
            //   this.service.getEpisodeDetails(this.movieid,seasonNumber,episode.episode_number).subscribe((res:any)=>{
            //     this.episodedetails = res
            //     console.log(res);
            //   })
            // });
          });
        });
       }

         
    })



    this.service.getMovieCast(this.movieid).subscribe((item:any)=>{
      this.movieCast = item.cast
      .filter((castmember: { known_for_department: string; })=>castmember.known_for_department)
      .map((filterCastMember: any) => filterCastMember)
      
      this.movieCrew = item.crew.filter((castmember: { known_for_department: string; })=>castmember.known_for_department)
      .map((filterCastMember: any) => filterCastMember)
      // console.log(this.movieCrew);

    })

    
    this.service.getReviews(this.movieid).subscribe((res:any)=>{
      this.reviews= res.results.map((author: { author_details: any; })=>author)
      // console.log(this.reviews);
      
      this.sanitize =  this.sanitizer. bypassSecurityTrustHtml(res.results.map((author: { content: any; })=>author.content))
      console.log(this.sanitize)
    }) 
    
    this.service.getVideos(type,this.movieid).subscribe((res:any)=>{
      this.videos = res.results.map((res:{})=>res)
      // console.log(this.videos);  
      
      
    })
   
  }
  playMovie(){

      console.log(this.videos.key);
      
  }
  
}
