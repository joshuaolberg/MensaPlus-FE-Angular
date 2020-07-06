import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {User} from '../model/classes/user';
import {BehaviorSubject, Observable} from 'rxjs';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
  private authenticationUrl: string;

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  public isAuthenticated = false;
  public isAuthenticatedAdmin = false;

  constructor(private http: HttpClient, private router: Router) {
    this.authenticationUrl = 'http://localhost:8080/authenticate';
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(sessionStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
    this.isAuthenticated = this.isLoggedIn();
    this.isAuthenticatedAdmin = this.isAdmin();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string) {
    return this.http.post<any>(this.authenticationUrl, {username, password}).pipe(
      map(
        user => {
          if (user && user.jwt) {
            sessionStorage.setItem('currentUser', JSON.stringify(user));
            this.isAuthenticated = true;
            this.currentUserSubject.next(user);
            this.isAuthenticatedAdmin = this.isAdmin();
            this.router.navigate(['home']);
          }
          return user;
        }
      )
    );
  }

  isLoggedIn(): boolean {
    if (sessionStorage.getItem('currentUser') === null) {
      this.isAuthenticated = false;
      return false;
    } else {
      this.isAuthenticated = true;
      return true;
    }
  }

  isAdmin(): boolean {
    if (this.isAuthenticated === true) {
      if (this.currentUserValue.role !== 'admin') {
        this.isAuthenticatedAdmin = false;
        return false;
      } else {
        this.isAuthenticatedAdmin = true;
        return true;
      }
    } else {
      return false;
    }
  }

  logOut() {
    sessionStorage.removeItem('currentUser');
    this.isAuthenticated = false;
    this.currentUserSubject.next(null);
  }
}
