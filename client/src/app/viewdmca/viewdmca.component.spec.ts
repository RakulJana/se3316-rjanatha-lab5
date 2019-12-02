import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewdmcaComponent } from './viewdmca.component';

describe('ViewdmcaComponent', () => {
  let component: ViewdmcaComponent;
  let fixture: ComponentFixture<ViewdmcaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewdmcaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewdmcaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
