export type Root = Root2[]

export interface Root2 {
  title: Title
  imdbRating: number
  summary: Summary
  categories: string[]
  whereToWatch: WhereToWatch
}

export interface Title {
  "@type": string
  id: string
  image: Image
  title: string
  titleType: string
  year: number
}

export interface Image {
  height: number
  id: string
  url: string
  width: number
}

export interface Summary {
  category: string
  characters: string[]
  displayYear: string
}

export interface WhereToWatch {
  releaseDate: string
  hasShowtimes: boolean
  hasDigitalOffers: boolean
  freeWithPrime: boolean
  hasTvShowings: boolean
  hasPhysicalOffers: boolean
}
