import { Routes } from '@angular/router';
// Importamos usando la ruta y nombres que confirmamos en el servidor
import { Login } from './components/login/login'; 
import { Register } from './components/register/register';
import { Catalogo } from './components/catalogo/catalogo';
import { Cart } from './components/cart/cart';
import { Dashboard } from './components/dashboard/dashboard';
import { Orders } from './components/orders/orders';

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
  },
  {
    path: 'carrito',
    component: Cart
  },
  {
    path: 'dashboard',
    component: Dashboard
  },
  {
    path: 'orders',
    component: Orders
  }

];