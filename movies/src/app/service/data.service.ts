import { HttpHeaders,HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

    constructor(private http : HttpClient) { }
    public apiKey = '3830a6670acb554a7579cf62e08d68d2'; // Replace with your TMDb API Key
    public apiUrl = 'https://api.themoviedb.org/3';
    public movieId: number | undefined;
    private apiBearerToken =
      'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzODMwYTY2NzBhY2I1NTRhNzU3OWNmNjJlMDhkNjhkMiIsInN1YiI6IjY1Njg3YjJjMTI3Nzc4MDlkOTg3YWQzMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.dfA8fVe4DO25CbauTmf1np7sBaUp2jJwTyK8iZoD6oo';


    getMovies() {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${this.apiBearerToken}`,
      });
      return this.http.get(`${this.apiUrl}/genre/movie/list`, { headers });
    }

    getMoviesByGenres(){
      const headers = new HttpHeaders({
        Authorization: `Bearer ${this.apiBearerToken}`,
      });
      return this.http.get(`${this.apiUrl}/discover/movie?api_key=${this.apiKey}`, { headers });
    }
    
    getMoviesById(id:number,type:string){
      const headers = new HttpHeaders({
        Authorization: `Bearer ${this.apiBearerToken}`,
      });
      return this.http.get(`${this.apiUrl}/${type}/${id}?api_key=${this.apiKey}`
      , { headers });
    }


    getNowPlayingMovies(type:string){
      const headers = new HttpHeaders({
        Authorization: `Bearer ${this.apiBearerToken}`,
      });
      return this.http.get(`${this.apiUrl}/${type}/now_playing?api_key=${this.apiKey}`
      , { headers });
    }

    getTopRatedMovies(type:string){
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.apiBearerToken}`,
    });
    return this.http.get(`${this.apiUrl}/${type}/top_rated?api_key=${this.apiKey}`
    , { headers });
    }

    getdetails(type:string,movie_id:number){
      const headers = new HttpHeaders({
        Authorization: `Bearer ${this.apiBearerToken}`,
      });
      return this.http.get(`${this.apiUrl}/${type}/${movie_id}?api_key=${this.apiKey}`
      , { headers });
    }

    getMovieCast(movie_id:number){
      const headers = new HttpHeaders({
        Authorization: `Bearer ${this.apiBearerToken}`,
      });
      return this.http.get(`${this.apiUrl}/movie/${movie_id}/credits?api_key=${this.apiKey}`
      , { headers });
    }

    getReviews(movie_id:number){
      const headers = new HttpHeaders({
        Authorization: `Bearer ${this.apiBearerToken}`,
      });
      return this.http.get(`${this.apiUrl}/movie/${movie_id}/reviews?api_key=${this.apiKey}`
      , { headers });
    }

    getTvAir(){
      const headers = new HttpHeaders({
        Authorization: `Bearer ${this.apiBearerToken}`,
      });
      return this.http.get(`${this.apiUrl}/tv/airing_today?api_key=${this.apiKey}`
      , { headers });
    }

    getPopularshows(type:string){
      const headers = new HttpHeaders({
        Authorization: `Bearer ${this.apiBearerToken}`,
      });
      return this.http.get(`${this.apiUrl}/${type}/popular?api_key=${this.apiKey}`
      , { headers });
    }

    getTvShowData(series_id:number){
      const headers = new HttpHeaders({
        Authorization: `Bearer ${this.apiBearerToken}`,
      });
      return this.http.get(`${this.apiUrl}/tv/${series_id}?api_key=${this.apiKey}`
      , { headers });
    }

    getSeasonDetails(series_id:number,season_number:number){
      const headers = new HttpHeaders({
        Authorization: `Bearer ${this.apiBearerToken}`,
      });
      return this.http.get(`${this.apiUrl}/tv/${series_id}/season/${season_number}?api_key=${this.apiKey}`
      , { headers });
    }

    getEpisodeDetails(series_id:number,season_number:number,episode_number:number){
      const headers = new HttpHeaders({
        Authorization: `Bearer ${this.apiBearerToken}`,
      });
      return this.http.get(`${this.apiUrl}/tv/${series_id}/season/${season_number}/episode/${episode_number}?api_key=${this.apiKey}`
      , { headers });
    }
    
    getVideos(type:string,movie_id:number){
      const headers = new HttpHeaders({
        Authorization: `Bearer ${this.apiBearerToken}`,
      });
      return this.http.get(`${this.apiUrl}/${type}/${movie_id}/videos?api_key=${this.apiKey}`
      , { headers });
    }

    private questionsSubject = new BehaviorSubject<string[]>([]);
    questions$ = this.questionsSubject.asObservable();
  
    addQuestion(question: string): void {
      const currentQuestions = this.questionsSubject.value;
      this.questionsSubject.next([...currentQuestions, question]);
    }
    

}
