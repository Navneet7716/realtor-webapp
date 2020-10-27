import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './component/home/home.component';
import { SearchComponent } from './component/search/search.component';
import { PropertycardComponent } from './component/home/propertycard/propertycard.component';
import { SlideshowComponent } from './component/home/slideshow/slideshow.component';
import { PropertyService } from './services/property.service';
import { UserService } from './services/user.service';
import { NavbarComponent } from './component/navbar/navbar.component';

import { ChartsModule } from 'ng2-charts';



// MATERIAL IMPORTS
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { MatInputModule } from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { FooterComponent } from './component/home/footer/footer.component';
import { DetailComponent } from './component/detail/detail.component';
import { MapComponent } from './component/detail/map/map.component';
import { CalculatorComponent } from './component/calculator/calculator.component';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { ProfileComponent } from './component/profile/profile.component';
import { AuthGuard } from './auth.guard';
import { AuthInterceptor } from './auth.interceptor';
import { AboutComponent } from './component/about/about.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SearchComponent,
    PropertycardComponent,
    SlideshowComponent,
    NavbarComponent,
    FooterComponent,
    DetailComponent,
    MapComponent,
    CalculatorComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    AboutComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatSliderModule,
    MatFormFieldModule,
    ChartsModule,
    MatSidenavModule,
    MatProgressBarModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }, PropertyService, AuthGuard, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
