import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignInFormComponent } from './sign-in-form.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserAccountService } from '../user-account.service';
import { Observable, of } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('SignInFormComponent', () => {
  let component: SignInFormComponent;
  let fixture: ComponentFixture<SignInFormComponent>;
  let mockUserService: Partial<UserAccountService> = {
    signIn(username: string, password: string) {
      return of(true);
    },
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignInFormComponent, HttpClientTestingModule, RouterTestingModule],
      providers: [
        HttpTestingController,
        {
          provide: UserAccountService,
          useValue: mockUserService
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SignInFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should sign in when the form is submitted', () => {
    component.signInForm.get('username')?.setValue('testuser');
    component.signInForm.get('password')?.setValue('password');
    component.submitForm();
    fixture.detectChanges();
    expect(component.signedIn).toEqual(true);
  });

});
