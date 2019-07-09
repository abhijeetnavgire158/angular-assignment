import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { tap, map, take, exhaustMap, catchError } from 'rxjs/operators';

import { Subject, throwError, BehaviorSubject, Observable } from 'rxjs';
import { Auth } from '../models/auth.model';


@Injectable({ providedIn: 'root' })

export class UserService {
    apiUrl = 'https://ng-httpmodule.firebaseio.com/';
    apiKey = 'AIzaSyAs9vhkgrtDsZfHBumFi0fn6Iindsx2P-k'
    users: User[] = [];
    usersChanged = new Subject<any>();
    // userAuth = new Subject<Auth>();
    userAuth = new BehaviorSubject<Auth>(null);

    constructor(private http: HttpClient) { }

    setUsers(users: User[]) {
        this.users = users;
        this.usersChanged.next(this.users.slice());
    }

    saveUser(newUser: User) {

        return this.http.post(
            'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=' + this.apiKey,
            {
                email: newUser.email,
                password: newUser.password,
                returnSecureToken: true
            }
        ).pipe(take(1), exhaustMap((responseData) => {
            this.users.push(newUser);

            return this.http.post(this.apiUrl + 'users.json', newUser);
        }));
    }

    loginUser(email: string, password: string) {
        return this.http
            .post<{ email: string, localId: string, idToken: string, expiresIn: string }>(
                'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=' + this.apiKey,
                {
                    email: email,
                    password: password,
                    returnSecureToken: true
                }
            ).pipe(catchError((errorRes) => this.handleError(errorRes)),
                tap((responseData) => {
                    console.log('Login Successfully');
                    console.log(responseData);
                    this.handleAuthUser(
                        responseData.email,
                        responseData.localId,
                        responseData.idToken,
                        parseInt(responseData.expiresIn)
                    );
                })
            );
    }

    private handleAuthUser(email: string, userId: string, token: string, expirationIn: number) {
        const expiredDate = new Date(new Date().getTime() + expirationIn * 1000);
        const authUser = new Auth(email, userId, token, expiredDate);
        this.userAuth.next(authUser);
        localStorage.setItem('userData', JSON.stringify(authUser));
    }

    getUsers() {
        this.users = [];
        return this.http
            .get<User[]>(
                this.apiUrl + 'users.json'
            )
            .pipe(
                map(users => {
                    let ss = [];
                    for (const key in users) {
                        if (users.hasOwnProperty(key)) {
                            const user = users[key];
                            this.users.push(user);
                        }
                    }
                    return this.users;
                })
            ).subscribe((users) => {
                this.setUsers(users)
            });
    }

    private handleError(errorRes: HttpErrorResponse) {
        console.log(errorRes);
        let errorMessage = 'An unknown error occurred!';
        if (!errorRes.error || !errorRes.error.error) {
            return throwError(errorMessage);
        }
        switch (errorRes.error.error.message) {
            case 'EMAIL_NOT_FOUND':
                errorMessage = `There is no user record corresponding to this identifier.
                    The user may have been deleted.`;
                break;
            case 'INVALID_PASSWORD':
                errorMessage = 'The password is invalid or the user does not have a password.'
                break;
            case 'USER_DISABLED':
                errorMessage = 'The user account has been disabled by an administrator.';
                break;
            default:
                errorMessage = 'We have blocked all requests from this device due to unusual activity. Try again later.'
                break;
        }

        return throwError(errorMessage);
    }

    logout() {
        localStorage.removeItem('userData');
        this.userAuth.next(null);
    }

    checkLoggedInUser() {
        let userData = JSON.parse(localStorage.getItem('userData'));
        if (!userData) {
            return null;
        }

        const loggedUser = new Auth(
            userData.email,
            userData.userId,
            userData._token,
            new Date(userData._expirationDate)
        );
        if (loggedUser.token) {
            this.userAuth.next(loggedUser);
        }
    }
}