//User service

import { Injectable } from '@angular/core';  
import { Observable } from 'rxjs/rx';
import { User } from '../models/user';
import { Http } from '@angular/http';

@Injectable()
export class UserService {
    constructor(private http: Http) {}

    getUsers(since:number): Observable<User[]> {
        return this.http.get('https://api.github.com/users?since='+since)
        .map(res => res.json());
    }

    getUser(login:string): Observable<User> {
        return this.http.get('https://api.github.com/users/'+login)
        .map(res => res.json());
    }
}