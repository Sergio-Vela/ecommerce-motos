import { Routes } from '@angular/router';

import { Login } from './components/login/login';
import { Register } from './components/register/register';
import { Catalogo } from './components/catalogo/catalogo';

export const routes: Routes = [

  {
    path: '',
    component: Catalogo
  },

  {
    path: 'login',
    component: Login
  },

  {
    path: 'register',
    component: Register
  }

];