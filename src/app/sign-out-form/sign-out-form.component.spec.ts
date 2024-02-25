import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignOutFormComponent } from './sign-out-form.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserAccountService } from '../user-account.service';

describe('SignOutFormComponent', () => {
  let component: SignOutFormComponent;
  let fixture: ComponentFixture<SignOutFormComponent>;
  let mockUserService: UserAccountService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignOutFormComponent, HttpClientTestingModule, RouterTestingModule],
      providers: [UserAccountService, HttpTestingController]
    }).compileComponents();

    fixture = TestBed.createComponent(SignOutFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    mockUserService = TestBed.inject(UserAccountService)
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
