import { ApplicationGuard } from './services/authentication/applicationGuard';
import { Routes } from '@angular/router';
import { LoginComponent } from './components/authentication/login/login.component';
import { LoginGuard } from './services/authentication/loginGuard';
import { RegisterComponent } from './components/authentication/register/register.component';
import { MainPageComponent } from './components/main-page/main-page.component';

export const rootRouterConfig: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [LoginGuard] },
  { path: 'home', component: MainPageComponent, canActivate: [ApplicationGuard] }
];