import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'tareas',
    loadComponent: () => import('./tareas/tareas.page').then( m => m.TareasPage)
  },
  {
    path: 'sign-up',
    loadComponent: () => import('./sign-up/sign-up.page').then( m => m.SignUpPage)
  },  {
    path: 'password-reset',
    loadComponent: () => import('./password-reset/password-reset.page').then( m => m.PasswordResetPage)
  },

];
