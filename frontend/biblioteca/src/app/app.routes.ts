import { Routes } from '@angular/router';
// Importamos usando la ruta y nombres que confirmamos en el servidor
import { Login } from './components/login/login'; 
import { Register } from './components/register/register';
import { Catalogo } from './components/catalogo/catalogo';

export const routes: Routes = [
    { path: 'login', component: Login },
    { path: 'register', component: Register },
    { path: 'catalogo', component: Catalogo },
    { path: '', redirectTo: 'login', pathMatch: 'full' }
];