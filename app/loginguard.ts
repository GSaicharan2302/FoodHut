import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./service/auth.service";
import { Injectable } from "@angular/core";
@Injectable({
    providedIn:'root'
})
export class Loginguard implements CanActivate {
    constructor(private authService:AuthService,private router:Router){}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        if(this.authService.role==="customer"){
            return true;
        }
        else{
                return this.router.navigateByUrl("/login");
        }
    }
}
