import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterRestaurantComponent } from './register-restaurant/register-restaurant.component';
import { RegistrationComponent } from './registration/registration.component';
import { RestaurantListComponent } from './restaurant-list/restaurant-list.component';
import { RestaurantLoginComponent } from './restaurant-login/restaurant-login.component';
import { RestaurantPanelComponent } from './restaurant-panel/restaurant-panel.component';
import { SignupComponent } from './signup/signup.component';
import { FooterComponent } from './footer/footer.component';
import { NavigationComponent } from './navigation/navigation.component';
import { RestaurantviewComponent } from './restaurantview/restaurantview.component';
import { ProductviewComponent } from './productview/productview.component';
import { CartviewComponent } from './cartview/cartview.component';
import { OrderviewComponent } from './orderview/orderview.component';
import { Loginguard } from './loginguard';
import { HomeloginComponent } from './homelogin/homelogin.component';
import { RestaurantorderviewComponent } from './restaurantorderview/restaurantorderview.component';
import { AddItemComponent } from './add-item/add-item.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { RestaurantRegisterComponent } from './restaurant-register/restaurant-register.component';

const routes: Routes = [
  {path:"",component:HomeComponent},
  {path:'home',component:HomeComponent},
  {path:'registration',component:RegistrationComponent},
  {path:'orderview',component:OrderviewComponent,canActivate:[Loginguard]},
  {path:'login',component:LoginComponent},
  {path:'signup',component:SignupComponent},
  {path:'profile',component:ProfileComponent,canActivate:[Loginguard]},
  {path:'restaurant',component:RestaurantPanelComponent},
  {path:'restaurant-list',component:RestaurantListComponent},
  {path:'register-restaurant',component:RestaurantRegisterComponent},
  {path:'restaurant-login',component:RestaurantLoginComponent},
  {path:'footer',component:FooterComponent},
  {path:'restaurantview/:city',component:RestaurantviewComponent},  
  {path:'productview/:city/:resname',component:ProductviewComponent},
  {path:'cartview',component:CartviewComponent,canActivate:[Loginguard]},
  {path:'homelogin',component:HomeloginComponent},
  {path:'additem',component:AddItemComponent},
  {path:'adminlogin',component:AdminLoginComponent},
  {path:'restaurantorderview',component:RestaurantorderviewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
