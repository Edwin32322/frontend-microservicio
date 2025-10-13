import { Routes } from '@angular/router';

export const routes: Routes = [
{
  path: 'home',
  loadChildren: () => import('./modules/home/home.routes').then(r => r.homeRoutes)
},
{
  path: 'users',
  loadChildren: () => import('./modules/users/users.routes').then(r => r.userRoutes)
},
{
  path: '**',
  redirectTo: 'users'
}
];