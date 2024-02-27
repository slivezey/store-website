import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountMenuComponent } from './account-menu.component';
import { UserAccountService } from '../user-account.service';
import { EventService } from '../event.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

describe('AccountMenuComponent', () => {
  let component: AccountMenuComponent;
  let fixture: ComponentFixture<AccountMenuComponent>;
  let mockEventService: EventService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountMenuComponent, HttpClientTestingModule, RouterTestingModule],
      providers: [UserAccountService, EventService, HttpTestingController]
    }).compileComponents();

    fixture = TestBed.createComponent(AccountMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    mockEventService = TestBed.inject(EventService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the sign-in link when a user signs out', () => {
    mockEventService.emit('signout', { username: 'testuser' });
    fixture.detectChanges();
    const link = fixture.debugElement.query(By.css('.dropdown-item'));
    expect(link.nativeElement.textContent.trim()).toBe('Sign-In')
  });

  it('should display the sign-out link when a user signs in', () => {
    mockEventService.emit('signin', {});
    fixture.detectChanges();
    const link = fixture.debugElement.query(By.css('.dropdown-item'));
    expect(link.nativeElement.textContent.trim()).toBe('Sign-Out')
  });

});
