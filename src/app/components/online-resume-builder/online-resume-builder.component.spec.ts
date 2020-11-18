import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlineResumeBuilderComponent } from './online-resume-builder.component';

describe('OnlineResumeBuilderComponent', () => {
  let component: OnlineResumeBuilderComponent;
  let fixture: ComponentFixture<OnlineResumeBuilderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnlineResumeBuilderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnlineResumeBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
