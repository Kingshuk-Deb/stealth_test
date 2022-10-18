export interface Movie {
  id?: number;
  name: string;
  rating: string;
  cast: [string];
  genre: string;
  releaseDate: Date;
}
