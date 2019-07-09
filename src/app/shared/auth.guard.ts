import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';
import { take, map, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

    constructor(private userService: UserService, private router: Router) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {
        console.log('auth guard callsss')
        return this.userService.userAuth.pipe(
            take(1),
            map((auth) => {
                console.log('calls');
                return (auth) ? true : false;
            }),
            tap((isAuth) => {
                console.log('Auth guard call');
                console.log(isAuth);
                if (isAuth) {
                    return true;
                }
                console.log('Auth guard call');
                this.router.navigate(['/login']);
            })
        );
    }
}
