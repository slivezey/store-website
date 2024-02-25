import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpFormComponent } from './sign-up-form.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserAccountService } from '../user-account.service';

describe('SignUpFormComponent', () => {
  let component: SignUpFormComponent;
  let fixture: ComponentFixture<SignUpFormComponent>;
  let mockUserService: UserAccountService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignUpFormComponent, HttpClientTestingModule, RouterTestingModule],
      providers: [UserAccountService, HttpTestingController]
    }).compileComponents();

    fixture = TestBed.createComponent(SignUpFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    mockUserService = TestBed.inject(UserAccountService)
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
