import { TestBed } from '@angular/core/testing';

import { OnlineResumeBuilderService } from './online-resume-builder.service';

describe('OnlineResumeBuilderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OnlineResumeBuilderService = TestBed.get(OnlineResumeBuilderService);
    expect(service).toBeTruthy();
  });
});
