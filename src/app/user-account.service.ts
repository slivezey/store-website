import { HttpClient, HttpErrorResponse, HttpEventType, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { EventService } from './event.service';
import { API_BASE_URL } from './abstract-api.service';

@Injectable({
  providedIn: 'root'
})
export class UserAccountService {

  constructor(private http: HttpClient, private eventBus: EventService) {}

  private getStandardOptions(): any {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
  }

  getUsername(): string {
    let name = localStorage.getItem('username');

    if (!name) {
      name = '';
    }
    return name;
  }

  isSignedIn(): boolean {
    let accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
      return false;
    }
    return true;
  }

  signIn(username: string, password: string): Observable<boolean> {
    return new Observable<boolean>(observer => {
      let payload = { username: username, password: password };
      let options = this.getStandardOptions();

      this.http.post<SignInResponse>(`${API_BASE_URL}/auth/sign-in`, payload, options)
        .pipe(catchError(this.handleError))
        .subscribe({
          next: (data) => {
            let response = data as unknown as SignInResponse;

            localStorage.setItem('username', username);
            localStorage.setItem('accessToken', response.accessToken);
            localStorage.setItem('refreshToken', response.refreshToken);
            this.eventBus.emit('signin', response);
            observer.next(true);
          },
          error: (error: HttpErrorResponse) => {
            observer.next(false);
          },
          complete: () => observer.complete()
        });
    });
  }

  signOut(): Observable<boolean> {
    return new Observable<boolean>(observer => {
      let options = this.getStandardOptions();
      let accessToken = localStorage.getItem('accessToken');

      if (accessToken) {
        options.headers = options.headers.set('Authorization', `Bearer ${accessToken}`);
      }

      this.http.post<SignInResponse>(`${API_BASE_URL}/auth/sign-out`, {}, options)
        .pipe(catchError(this.handleError))
        .subscribe({
          next: (data) => {
            localStorage.removeItem('username');
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            this.eventBus.emit('signout', {});
            observer.next(true);
          },
          error: (error: HttpErrorResponse) => {
            observer.next(false);
          },
          complete: () => observer.complete()
        });
    });
  }

  signUp(username: string, email: string, password: string): Observable<{ success: boolean, message: string }> {
    return new Observable<{ success: boolean, message: string }>(observer => {
      let payload = { username: username, email: email, password: password };
      let options = this.getStandardOptions();

      this.http.post<SignUpResponse>(`${API_BASE_URL}/auth/sign-up`, payload, options)
        .pipe(catchError(this.handleError))
        .subscribe({
          next: (data) => {
            let response = data as unknown as SignUpResponse;

            observer.next({ success: true, message: response.message });
          },
          error: (error: HttpErrorResponse) => {
            observer.next({ success: false, message: error.message });
          },
          complete: () => observer.complete()
        });
    });
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status == 0) {
      console.error('Client or network problem: ', error.error);
    } else {
      console.error('Server Error: ', error.error);
    }
    return throwError(() => new Error(error.error.message));
  }

}

interface SignInResponse {
  accessToken: string;
  refreshToken: string;
  username: string;
}

interface SignUpResponse {
  message: string;
}
