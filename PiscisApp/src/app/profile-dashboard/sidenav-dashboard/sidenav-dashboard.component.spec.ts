import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenavDashboardComponent } from './sidenav-dashboard.component';

describe('SidenavDashboardComponent', () => {
  let component: SidenavDashboardComponent;
  let fixture: ComponentFixture<SidenavDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidenavDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidenavDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
