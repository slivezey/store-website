import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductListComponent } from './product-list.component';
import { StoreService } from '../store.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import { Observable, of } from 'rxjs';
import createSpyObj = jasmine.createSpyObj;
import SpyObj = jasmine.SpyObj;

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let mockStoreService: Partial<StoreService> = {
    echoText(text: string): Observable<string> {
      return of(text);
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductListComponent, HttpClientTestingModule],
      providers: [
        StoreService,
        {
          provide: StoreService,
          useValue: mockStoreService
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('shoud switch the message when the button is pressed', () => {
    const button: any = fixture.debugElement.query(By.css('.btn-primary'));

    button.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(component.text).toBe('Updated Message');
  });
});

