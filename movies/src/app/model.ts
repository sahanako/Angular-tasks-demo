export interface moviesList{
genreDetails: any
posterPath: any
matchingGenres: any
    id:string,
    name:string
}

//differnt movies
export interface Root {
    page: number
    results: Result[]
    total_pages: number
    total_results: number
  }
  
  export interface Result {
    adult: boolean
    backdrop_path: string
    genre_ids: number[]
    id: string
    original_language: string
    original_title: string
    overview: string
    popularity: number
    poster_path: string
    release_date: string
    title: string
    video: boolean
    vote_average: number
    vote_count: number
  }
  
  export interface DialogData {
    question?:string;
    }

//moviedata
    export interface Root {
      adult: boolean
      backdrop_path: string
      belongs_to_collection: any
      budget: number
      genres: Genre[]
      homepage: string
      id: string
      imdb_id: string
      original_language: string
      original_title: string
      overview: string
      popularity: number
      poster_path: string
      production_companies: ProductionCompany[]
      production_countries: ProductionCountry[]
      release_date: string
      revenue: number
      runtime: number
      spoken_languages: SpokenLanguage[]
      status: string
      tagline: string
      title: string
      video: boolean
      vote_average: number
      vote_count: number
    }
    
    export interface Genre {
      id: string
      name: string
    }
    
    export interface ProductionCompany {
      id: string
      logo_path?: string
      name: string
      origin_country: string
    }
    
    export interface ProductionCountry {
      iso_3166_1: string
      name: string
    }
    
    export interface SpokenLanguage {
      english_name: string
      iso_639_1: string
      name: string
    }
    

    //cast
    export interface Root {
      id: string
      cast: Cast[]
      crew: Crew[]
    }
    
    export interface Cast {
      adult: boolean
      gender: number
      id: string
      known_for_department: string
      name: string
      original_name: string
      popularity: number
      profile_path?: string
      cast_id: number
      character: string
      credit_id: string
      order: number
    }
    
    export interface Crew {
      adult: boolean
      gender: number
      id: string
      known_for_department: string
      name: string
      original_name: string
      popularity: number
      profile_path?: string
      credit_id: string
      department: string
      job: string
    }
    
//reviews

export interface Root {
  id: string
  page: number
  results: Result[]
  total_pages: number
  total_results: number
}

export interface Result {
  author: string
  author_details: AuthorDetails
  content: string
  created_at: string
  id: string
  updated_at: string
  url: string
}

export interface AuthorDetails {
  name: string
  username: string
  avatar_path?: string
  rating?: number
}
