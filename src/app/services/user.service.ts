import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { Subject } from 'rxjs';


@Injectable({providedIn: 'root'})

export class UserService {
    apiUrl = 'https://ng-httpmodule.firebaseio.com/';
    apiKey = 'AIzaSyAs9vhkgrtDsZfHBumFi0fn6Iindsx2P-k'
    users: User[] = [];
    usersChanged= new Subject<any>();

    constructor(private http: HttpClient) {}

    setUsers(users: User[]) {
        this.users = users;
        this.usersChanged.next(this.users.slice());
    }

    saveUser(newUser: User) {
        this.users.push(newUser);
        this.http.post(
            'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key='+this.apiKey,
            {
                email: newUser.email,
                password: newUser.password,
                returnSecureToken: true
            }
        ).subscribe((responseData)=> {
            console.log(responseData);
        });

        return this.http.post(this.apiUrl + 'users.json', newUser);
    }

    loginUser(email:string, password: string) {
        console.log(this.users);
    }

    getUsers() {
        return this.http.get<User[]>(this.apiUrl+ 'users.json')
        .pipe(    
            map(users => {
              return users.map(user => {
                return {
                  ...user
                };
              });
            }),
            tap(users => {
            //   this.setUsers(users);
            })
        );
    }
}