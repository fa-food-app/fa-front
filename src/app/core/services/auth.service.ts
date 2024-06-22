import { HttpClient } from '@angular/common/http';
import { computed, Injectable, signal } from '@angular/core';
import { environment } from 'environments/environment';
import {
  Login,
  LoginResponse,
  RegisterResponse,
  RegisterUser,
  User,
} from '../interfaces';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { AuthStatus } from '../enum/auth-status';
import { CheckTokenResponse } from '../interfaces/check-token.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly url: string = environment.url || '';
  private _currentUser = signal<User | null>(null);
  private _authStatus = signal<AuthStatus>(AuthStatus.CHECKING);

  public currentUser = computed(() => this._currentUser());
  public authStatus = computed(() => this._authStatus());

  constructor(private http: HttpClient) {
    this.checkAuthStatus().subscribe()
  }

  private setAuthentication(user: User, token: string): boolean {
    this._authStatus.set(AuthStatus.AUTHENTICATED);
    this._currentUser.set(user);
    localStorage.setItem('token', token);
    return true;
  }
  login(credenciales: Login): Observable<boolean> {
    return this.http
      .post<LoginResponse>(`${this.url}/auth/login`, credenciales)
      .pipe(
        map(({ user, token }) => this.setAuthentication(user, token)),
        catchError((err) => throwError(() => err.error.message))
      );
  }
  register(user: RegisterUser): Observable<boolean> {
    return this.http
      .post<RegisterResponse>(`${this.url}/auth/register`, user)
      .pipe(
        map(({ user, token }) => this.setAuthentication(user, token)),
        catchError((err) => throwError(() => err.error.message))
      );
  }

  checkEmail(email: string) {
    return this.http.post<User>(`${this.url}/auth/check-email`, { email });
  }
  checkAuthStatus(): Observable<boolean> {
    const token = localStorage.getItem('token');
    if (!token) {
      this.logout();
      return of(false);
    }

    return this.http
      .get<CheckTokenResponse>(`${this.url}/auth/check-token`)
      .pipe(
        map(({ user, token }) => this.setAuthentication(user, token)),
        catchError(() => {
          this._authStatus.set(AuthStatus.NOTAUTHENTICATED);
          return of(false);
        })
      );
  }

  logout() {
    localStorage.removeItem('token');
    this._authStatus.set(AuthStatus.NOTAUTHENTICATED);
    this._currentUser.set(null);
  }
}
