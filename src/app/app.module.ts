import { NgModule } from '@angular/core';

import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http'; // Ensure you import provideHttpClient and withFetch
import { ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { BookComponent } from './book/book.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatMenuModule } from '@angular/material/menu';
import { CartComponent } from './cart/cart.component';

 

const routes: Routes =  [
  {path:'login',component:LoginComponent},
  {path:'book',component:BookComponent},
  {path:'contact',component:ContactComponent},
  {path:'about',component:AboutComponent},
  {path:'cart',component:CartComponent}

];
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    BookComponent,
    ContactComponent,
    AboutComponent,
    CartComponent
  ],
  imports: [
    BrowserModule,RouterModule.forRoot(routes),
    BrowserAnimationsModule,ReactiveFormsModule,
    HttpClientModule, // Import HttpClientModule
    AppRoutingModule,
    MatToolbarModule, MatNativeDateModule,
    MatIconModule,MatDatepickerModule,
    MatButtonModule, MatCheckboxModule,
    MatSidenavModule,MatSelectModule,MatMenuModule,
    MatListModule,MatInputModule,MatFormFieldModule,MatCardModule
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(withFetch()), // Configure HttpClient to use fetch
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
