import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { DetailComponent } from './features/detail/detail.component';
import { MyMoviesComponent } from './features/my-movies/my-movies.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'detail/:id', component: DetailComponent },
  { path: 'my-movies', component: MyMoviesComponent }
];
