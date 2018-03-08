import { TestBed, async, inject } from '@angular/core/testing';

import { VerifiedContentOnlyGuard } from './verified-content-only.guard';

describe('VerifiedContentOnlyGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VerifiedContentOnlyGuard]
    });
  });

  it('should ...', inject([VerifiedContentOnlyGuard], (guard: VerifiedContentOnlyGuard) => {
    expect(guard).toBeTruthy();
  }));
});
