import { TestBed } from '@angular/core/testing';

import { contactsService } from './contacts-service';

describe('contactsService', () => {
  let service: contactsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(contactsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
