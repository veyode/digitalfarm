import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GatewaysDetailComponent } from './gateways-detail.component';

describe('GatewaysDetailComponent', () => {
  let component: GatewaysDetailComponent;
  let fixture: ComponentFixture<GatewaysDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GatewaysDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GatewaysDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
