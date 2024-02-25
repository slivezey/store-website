import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { API_BASE_URL, AbstractApiService } from './abstract-api.service';

@Injectable({
  providedIn: 'root'
})
export class StoreService extends AbstractApiService {

  echoText(text: string): Observable<string> {
    return new Observable<string>(observer => {
      this.sendRequest('post', `${API_BASE_URL}/api/user/echo`, { message: text }).subscribe({
        next: data => {
          let response = data as any;
          observer.next(response.message);
        },
        error: (error: HttpErrorResponse) => this.handleError(error)
      });
    })
  }

}
