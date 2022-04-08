import { Component, OnInit } from '@angular/core';
import { MovieService } from './movies.service';
import { Movie } from 'src/app/models/movie';
import { HttpClient } from '@angular/common/http';

@Component({
  template: `
    <div class="container mt-3">
      <div class="row justify-content-between">
      <div *ngFor="let movie of movies" class="card text-center mb-5 p-2 bg-warning" style="width: 18rem; height: auto">
            <img class="img-fluid" srcset="http://image.tmdb.org/t/p/w500{{movie.poster_path}}"/>
            <div class="card-body">
              <h5 class="card-title">{{ movie.title }}</h5>
              <p class="card-text">{{ movie.overview }}</p>
              <p>{{ movie.popularity }}</p>
              <p>{{ movie.release_date }}</p>
              <button *ngIf="movie.like" (click)="unlike(movie)">❤</button>
              <button *ngIf="!movie.like" (click)="like(movie)">🖤</button>
            </div>
          </div>
        </div>
      </div>
  `,
  styles: [
  ],
})

export class MoviesPage implements OnInit {
  constructor(private movieSrv: MovieService, private http: HttpClient) {}
  movies: Movie[] | undefined;

  ngOnInit(): void {
    setInterval(() => {
      this.movies = this.movieSrv.movies;
    }, 20);
    if (!this.movies) {
      this.movieSrv.inserisciFilm();
    }
  }

  like(movie: Movie) {
    this.movieSrv.addFavorite(movie);
  }

  unlike(movie: Movie) {
    this.movieSrv.removeFavourite(movie);
  }
}
