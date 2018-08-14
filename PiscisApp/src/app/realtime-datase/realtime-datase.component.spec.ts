import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RealtimeDataseComponent } from './realtime-datase.component';

describe('RealtimeDataseComponent', () => {
  let component: RealtimeDataseComponent;
  let fixture: ComponentFixture<RealtimeDataseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RealtimeDataseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RealtimeDataseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
