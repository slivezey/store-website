import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignOutFormComponent } from './sign-out-form.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserAccountService } from '../user-account.service';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';

describe('SignOutFormComponent', () => {
  let component: SignOutFormComponent;
  let fixture: ComponentFixture<SignOutFormComponent>;
  let mockUserService: Partial<UserAccountService> = {
    signOut() {
      return of(true);
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignOutFormComponent, HttpClientTestingModule, RouterTestingModule],
      providers: [
        HttpTestingController,
        {
          provide: UserAccountService,
          useValue: mockUserService
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SignOutFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    mockUserService = TestBed.inject(UserAccountService)
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should sign the user out when the Yes link is clicked', () => {
    const button: any = fixture.debugElement.query(By.css('.btn-primary'));

    button.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(component.signOutConfirmed).toEqual(true);
  });

  it('should not sign the user out when the Cancel link is clicked', () => {
    const button: any = fixture.debugElement.query(By.css('.btn-secondary'));

    button.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(component.signOutConfirmed).toEqual(false);
  });

});
