import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { AboutComponent } from './component/about/about.component';
import { CalculatorComponent } from './component/calculator/calculator.component';
import { DetailComponent } from './component/detail/detail.component';
import { ForgotPasswordComponent } from './component/forgot-password/forgot-password.component';
import { HomeComponent } from './component/home/home.component';
import { LoginComponent } from './component/login/login.component';
import { ProfileComponent } from './component/profile/profile.component';
import { RegisterComponent } from './component/register/register.component';
import { ResetpasswordComponent } from './component/resetpassword/resetpassword.component';
import { SearchComponent } from './component/search/search.component';
import { UpdatepasswordComponent } from './component/updatepassword/updatepassword.component';
import { UpdateuserComponent } from './component/updateuser/updateuser.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'home/:slug', component: DetailComponent },
  { path: 'emi', component: CalculatorComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'updateProfile', component: UpdateuserComponent, canActivate: [AuthGuard] },
  { path: 'updatePassword', component: UpdatepasswordComponent, canActivate: [AuthGuard] },
  { path: 'forgotpassword', component: ForgotPasswordComponent },
  { path: 'resetPassword/:token', component: ResetpasswordComponent },
  { path: 'search', component: SearchComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
