import { TestBed, async, inject } from '@angular/core/testing';

import { AuthContentOnlyGuard } from './auth-content-only.guard';

describe('AuthContentOnlyGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthContentOnlyGuard]
    });
  });

  it('should ...', inject([AuthContentOnlyGuard], (guard: AuthContentOnlyGuard) => {
    expect(guard).toBeTruthy();
  }));
});
