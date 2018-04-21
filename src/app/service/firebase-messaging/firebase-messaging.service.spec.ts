import { TestBed, inject } from '@angular/core/testing';

import { FirebaseMessagingService } from './firebase-messaging.service';

describe('FirebaseMessagingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FirebaseMessagingService]
    });
  });

  it('should be created', inject([FirebaseMessagingService], (service: FirebaseMessagingService) => {
    expect(service).toBeTruthy();
  }));
});
