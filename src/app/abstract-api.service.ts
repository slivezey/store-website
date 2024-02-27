import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, inject, isDevMode } from '@angular/core';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export abstract class AbstractApiService {

  protected http = inject(HttpClient);

  sendRequest<T>(method: string, url: string, body?: any, urlParams?: HttpParams, headers?: HttpHeaders): Observable<T> {
    let options = this.getStandardOptions();

    if (body) {
      options.body = body;
    }
    if (urlParams) {
      options.params = urlParams;
    }
    if (headers) {
      if (!options.headers) {
        options.headers = new HttpHeaders();
      }
      headers.keys().forEach(k => options.headers = options.headers.set(k, headers.get(k)));
    }

    return new Observable<T>(observer => {
      this.http.request<T>(method, url, options).subscribe({
        next: data => {
          let response: T = data as T;
          observer.next(response);
        },
        error: (error: HttpErrorResponse) => {
          if (error.status == 401) {
            this.refreshAccessToken().subscribe({
              next: updatedToken => {
                if (updatedToken) { // If the access token was updated, retry the original request
                  options.headers = options.headers.set('Authorization', `Bearer ${updatedToken}`);

                  this.http.request<T>(method, url, options).subscribe({
                    next: data => {
                      let response: T = data as T;
                      observer.next(response);
                    },
                    error: (error: HttpErrorResponse) => this.handleError(error)
                  })
                } else { // If the token refresh did not update for any reason, handle the error normally
                  this.handleError(error);
                }
              },
              error: (error: HttpErrorResponse) => this.handleError(error)
            })
          } else {
            this.handleError(error);
          }
        }
      })
    });
  }

  private refreshAccessToken(): Observable<string> {
    let refreshToken = localStorage.getItem('refreshToken');

    return new Observable<string>(observer => {
      let options = this.getStandardOptions();

      if (refreshToken) {
        this.http.post<any>(`${API_BASE_URL}/auth/token-refresh`, { refreshToken: refreshToken }, options)
          .subscribe({
            next: (data: any) => {
              localStorage.setItem('accessToken', data.accessToken);
              localStorage.setItem('refreshToken', data.refreshToken);
              observer.next(data.accessToken);
            },
            error: (error: HttpErrorResponse) => this.handleError(error),
            complete: () => observer.complete()
          });
      } else {
        observer.next(undefined);
      }
    });
  }

  protected handleError(error: HttpErrorResponse) {
    if (error.status == 0) {
      console.error('Client or network problem: ', error.error);
    } else {
      console.error('Server Error: ', error.error);
    }
    return throwError(() => new Error(error.error.message));
  }

  private getStandardOptions(includeAccessToken: boolean = true): any {
    let options: any = {
      headers: new HttpHeaders()
    };

    if (includeAccessToken) {
      let accessToken = localStorage.getItem('accessToken');

      if (accessToken) {
        options.headers = options.headers.set('Authorization', `Bearer ${accessToken}`);
      }
    }
    options.headers = options.headers.set('Content-Type', 'application/json');
    return options;
  }

}

export const API_BASE_URL = isDevMode() ? 'http://localhost:8082' : '';
