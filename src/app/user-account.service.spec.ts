import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserAccountService } from './user-account.service';

describe('UserAccountService', () => {
  let service: UserAccountService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(UserAccountService);
    httpMock = TestBed.inject(HttpTestingController);

    localStorage.removeItem('username');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should allow user to sign in', () => {
    expect(service.getUsername()).toEqual('');
    expect(service.isSignedIn()).toEqual(false);

    service.signIn('someuser', 'password').subscribe((result: boolean) => {
      expect(result).toBeTruthy();
      expect(result).toEqual(true);
    });
    let request = httpMock.expectOne('/auth/sign-in');
    expect(request.request.method).toEqual('POST');
    expect(request.request.body.username).toEqual('someuser');
    expect(request.request.body.password).toEqual('password');
    request.flush({
      username: 'someuser',
      accessToken: 'dummy-access-token',
      refreshToken: 'dummy-refresh-token'
    })
    expect(localStorage.getItem('username')).toEqual('someuser');
    expect(localStorage.getItem('accessToken')).toEqual('dummy-access-token');
    expect(localStorage.getItem('refreshToken')).toEqual('dummy-refresh-token');
    expect(service.getUsername()).toEqual('someuser');
    expect(service.isSignedIn()).toEqual(true);
  });

  it('should fail sign-in when a user enters an incorrect password', () => {
    service.signIn('someuser', 'badpassword').subscribe((result: boolean) => {
      expect(result).toEqual(false);
    });
    let request = httpMock.expectOne('/auth/sign-in');
    request.error(new ProgressEvent('error'), { status: 400 });
  });

  it('should fail sign-in when a network error occurs', () => {
    service.signIn('someuser', 'badpassword').subscribe((result: boolean) => {
      expect(result).toEqual(false);
    });
    let request = httpMock.expectOne('/auth/sign-in');
    request.error(new ProgressEvent('error'), { status: 0 });
  });

  it('should logout after a user has signed in', () => {
    service.signIn('someuser', 'password').subscribe((result: boolean) => {
      expect(result).toEqual(true);
    });
    let request1 = httpMock.expectOne('/auth/sign-in');
    request1.flush({
      username: 'someuser',
      accessToken: 'dummy-access-token',
      refreshToken: 'dummy-refresh-token'
    })

    service.signOut().subscribe((result: boolean) => {
      expect(result).toEqual(true);
    });
    let request2 = httpMock.expectOne('/auth/sign-out');
    request2.flush({});
  });

  it('should fail sign-out if an error happens on the server', () => {
    service.signIn('someuser', 'password').subscribe((result: boolean) => {
      expect(result).toEqual(true);
    });
    let request1 = httpMock.expectOne('/auth/sign-in');
    request1.flush({
      username: 'someuser',
      accessToken: 'dummy-access-token',
      refreshToken: 'dummy-refresh-token'
    })

    service.signOut().subscribe((result: boolean) => {
      expect(result).toEqual(false);
    });
    let request2 = httpMock.expectOne('/auth/sign-out');
    expect(request2.request.headers.get('Authorization')).toEqual('Bearer dummy-access-token');
    request2.error(new ProgressEvent('error'), { status: 500 });
  });

  it('should allow a new user to sign up', () => {
    service.signUp('someuser', 'test@example.com', 'password').subscribe((result: { success: boolean, message: string }) => {
      expect(result).toBeTruthy();
      expect(result.success).toEqual(true);
    });
    let request = httpMock.expectOne('/auth/sign-up');
    request.flush({
      message: 'User created successfully'
    });
  });

  it('should fail sign-up if the username or email is already in use', () => {
    service.signUp('someuser', 'test@example.com', 'password').subscribe((result: { success: boolean, message: string }) => {
      expect(result).toBeTruthy();
      expect(result.success).toEqual(false);
    });
    let request = httpMock.expectOne('/auth/sign-up');
    request.error(new ProgressEvent('error'), { status: 400 });
  });

});
