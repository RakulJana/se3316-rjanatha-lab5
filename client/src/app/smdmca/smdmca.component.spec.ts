import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmdmcaComponent } from './smdmca.component';

describe('SmdmcaComponent', () => {
  let component: SmdmcaComponent;
  let fixture: ComponentFixture<SmdmcaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmdmcaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmdmcaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
