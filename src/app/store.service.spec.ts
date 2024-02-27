import { TestBed } from '@angular/core/testing';

import { StoreService } from './store.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { API_BASE_URL } from './abstract-api.service';
import { HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';

describe('StoreService', () => {
  let service: StoreService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(StoreService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should allow an authenticated user to call the server', () => {
    service.echoText('ping').subscribe((response: string) => {
      expect(response).toEqual('ping');
    });
    let request = httpMock.expectOne(`${API_BASE_URL}/api/user/echo`);
    request.flush({ message: 'ping' });
  });

  it('should throw an error if an unauthenticated user attempts to call the server', () => {
    service.echoText('ping').subscribe((response: string) => {
      throw new Error('Test is failing');
    });
    let request = httpMock.expectOne(`${API_BASE_URL}/api/user/echo`);
    expect(request.request.body.message).toEqual('ping');
    request.error(new ProgressEvent('error'), { status: 401 });
  });

  it('should refresh the access token if an authenticated users token has gone stale', () => {
    localStorage.setItem('accessToken', 'dummy-access-token');
    localStorage.setItem('refreshToken', 'refresh-token');
    localStorage.setItem('username', 'testuser');

    service.echoText('ping').subscribe((response: string) => {
      throw new Error('Test is failing');
    });
    let request1 = httpMock.expectOne(`${API_BASE_URL}/api/user/echo`);
    expect(request1.request.body.message).toEqual('ping');
    request1.error(new ProgressEvent('error'), { status: 401 });

    let request2 = httpMock.expectOne(`${API_BASE_URL}/auth/token-refresh`);
    expect(request2.request.body.refreshToken).toEqual('refresh-token');
    request2.flush({
      accessToken: 'updated-access-token',
      refreshToken: 'refresh-token'
    });
  });

  it('should throw an error if the access token and refresh token have both gone stale', () => {
    localStorage.setItem('accessToken', 'dummy-access-token');
    localStorage.setItem('refreshToken', 'refresh-token');
    localStorage.setItem('username', 'testuser');

    service.echoText('ping').subscribe((response: string) => {
      throw new Error('Test is failing');
    });
    let request1 = httpMock.expectOne(`${API_BASE_URL}/api/user/echo`);
    expect(request1.request.body.message).toEqual('ping');
    request1.error(new ProgressEvent('error'), { status: 401 });

    let request2 = httpMock.expectOne(`${API_BASE_URL}/auth/token-refresh`);
    expect(request2.request.body.refreshToken).toEqual('refresh-token');
    request2.error(new ProgressEvent('error'), { status: 401 });
  });

  it('should fail sign-in when a network error occurs', () => {
    service.echoText('ping').subscribe((response: string) => {
      throw new Error('Test is failing');
    });
    let request = httpMock.expectOne(`${API_BASE_URL}/api/user/echo`);
    expect(request.request.body.message).toEqual('ping');
    request.error(new ProgressEvent('error'), { status: 0 });
  });

  it('should allow an authenticated user to call the server', () => {
    let body = { message: 'ping' };
    let params = new HttpParams();
    let headers = new HttpHeaders();

    params = params.set('customParam', 'paramValue');
    headers = headers.append('custom-header', 'header-value');

    service.sendRequest('post', `${API_BASE_URL}/api/user/echo`, body, params, headers).subscribe((response: any) => {});
    let request = httpMock.expectOne(`${API_BASE_URL}/api/user/echo?customParam=paramValue`);
    expect(request.request.headers.get('custom-header')).toEqual('header-value');
    request.flush({ message: 'ping' });
  });

});
