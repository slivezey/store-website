import { TestBed } from '@angular/core/testing';

import { EventService } from './event.service';

describe('EventService', () => {
  let service: EventService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should publish emitted events to listeners', () => {
    let isSuccess: boolean = false;
    service.listen('myevent', (payload: any) => {
      isSuccess = true;
    });
    service.emit('myevent', {});
    expect(isSuccess).toEqual(true);
  });

});
