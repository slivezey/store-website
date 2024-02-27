import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpFormComponent } from './sign-up-form.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserAccountService } from '../user-account.service';
import { of } from 'rxjs';

describe('SignUpFormComponent', () => {
  let component: SignUpFormComponent;
  let fixture: ComponentFixture<SignUpFormComponent>;
  let mockUserService: Partial<UserAccountService> = {
    signUp(username: string, email: string, password: string) {
      return of({ success: true, message: 'User signed up!' });
    },
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignUpFormComponent, HttpClientTestingModule, RouterTestingModule],
      providers: [
        HttpTestingController,
        {
          provide: UserAccountService,
          useValue: mockUserService
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SignUpFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    mockUserService = TestBed.inject(UserAccountService)
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create a new user when the form is submitted', () => {
    component.signUpForm.get('username')?.setValue('test user');
    component.signUpForm.get('username')?.setValue('testuser');
    component.signUpForm.get('email')?.setValue('test@example.com');
    component.signUpForm.get('password')?.setValue('password');
    component.signUpForm.get('passwordConfirm')?.setValue('passwordConfirm');
    component.submitForm();
    fixture.detectChanges();
    expect(component.signedUp).toEqual(true);
  });

});
