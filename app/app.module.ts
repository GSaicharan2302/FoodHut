import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegistrationComponent } from './registration/registration.component';
import { NavigationComponent } from './navigation/navigation.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { HeaderComponent } from './header/header.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import {MatCardModule} from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatStepperModule} from '@angular/material/stepper';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { ProfileComponent } from './profile/profile.component';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTabsModule} from '@angular/material/tabs';
import {MatBadgeModule} from '@angular/material/badge';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatDividerModule} from '@angular/material/divider';
import { RegisterRestaurantComponent } from './register-restaurant/register-restaurant.component';
import { RestaurantPanelComponent } from './restaurant-panel/restaurant-panel.component';
import { RestaurantLoginComponent } from './restaurant-login/restaurant-login.component';
import { RestaurantListComponent } from './restaurant-list/restaurant-list.component';
import { JwtModule } from '@auth0/angular-jwt';
import { FooterComponent } from './footer/footer.component';
// import {MatStepperModule} from '@angular/material/stepper';
import { RestaurantviewComponent } from './restaurantview/restaurantview.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatMenuModule} from '@angular/material/menu';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { ProductviewComponent } from './productview/productview.component';
import { CartviewComponent } from './cartview/cartview.component';
import { OrderviewComponent } from './orderview/orderview.component';
import { HomeloginComponent } from './homelogin/homelogin.component';
import { RestaurantorderviewComponent } from './restaurantorderview/restaurantorderview.component';
import { AddressformComponent } from './addressform/addressform.component';
import { AddItemComponent } from './add-item/add-item.component';
import { RestaurantRegisterComponent } from './restaurant-register/restaurant-register.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';

@NgModule({
  declarations: [

    AppComponent,
    HomeComponent,
    RegistrationComponent,
    NavigationComponent,
    HeaderComponent,
    LoginComponent,
    SignupComponent,
    ProfileComponent,
    RegisterRestaurantComponent,
    RestaurantPanelComponent,
    RestaurantLoginComponent,
    RestaurantListComponent,
    FooterComponent,
    RestaurantviewComponent,
    ProductviewComponent,
    CartviewComponent,
    OrderviewComponent,
    HomeloginComponent,
    RestaurantorderviewComponent,
    AddressformComponent,
    AddItemComponent,
    RestaurantRegisterComponent,
    AdminLoginComponent,
    
    
  ],
  imports: [
    MatSnackBarModule,
    HttpClientModule,
    MatSelectModule,
    MatOptionModule,
    MatStepperModule,
    MatInputModule,    
    ReactiveFormsModule,
    FormsModule,
    MatCardModule,    
    MatTooltipModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatFormFieldModule,
    MatMenuModule,
    FormsModule,
    MatCardModule,
   MatIconModule,
   MatTabsModule,
   MatBadgeModule,
   MatExpansionModule,
   MatDialogModule,
   MatAutocompleteModule,
   MatDividerModule,
   JwtModule.forRoot({
    config: {
      tokenGetter: () => localStorage.getItem('token'),
      allowedDomains: ['example.com'], // replace with your domain
    },
  }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
