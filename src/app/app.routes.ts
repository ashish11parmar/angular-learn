import { Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { authGuard, LoginGuard } from './guard/auth.guard';
import { NavbarComponent } from './components/navbar/navbar.component';

export const routes: Routes = [
    { path: 'register', canActivate: [LoginGuard], component: RegisterComponent },
    { path: 'login', canActivate: [LoginGuard], component: LoginComponent },
    { path: '', canActivate: [authGuard], component: NavbarComponent },
    { path: '**', redirectTo: '', pathMatch: 'full' }
];
