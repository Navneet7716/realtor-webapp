import { TestBed } from '@angular/core/testing';

import { OwnerGuardGuard } from './owner-guard.guard';

describe('OwnerGuardGuard', () => {
  let guard: OwnerGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(OwnerGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
