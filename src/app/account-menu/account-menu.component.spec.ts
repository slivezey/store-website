import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountMenuComponent } from './account-menu.component';
import { UserAccountService } from '../user-account.service';
import { Observable, never, of } from 'rxjs';
import { EventService } from '../event.service';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ActivatedRoute, RouterModule, provideRouter } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('AccountMenuComponent', () => {
  let component: AccountMenuComponent;
  let fixture: ComponentFixture<AccountMenuComponent>;
  let mockUserService: UserAccountService;
  let mockEventService: EventService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountMenuComponent, HttpClientTestingModule, RouterTestingModule],
      providers: [UserAccountService, EventService, HttpTestingController]
    }).compileComponents();

    fixture = TestBed.createComponent(AccountMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
