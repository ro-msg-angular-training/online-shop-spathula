import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject!: ReplaySubject<User>;

  private currentUser!: User;

  private loginUrl = 'http://localhost:3000/login'

  constructor(private httpClient: HttpClient) {
    this.currentUserSubject = new ReplaySubject<User>(1);
    this.currentUserSubject.asObservable().subscribe(user => this.currentUser = user);
  }

  login(username: string, password: string) {
    return this.httpClient.post<User>(this.loginUrl, { username, password })
      .pipe(map(user => {
        this.currentUserSubject.next(user);
        return user;
      }));
  }

  get getCurrentUser() { return this.currentUser; }
}
