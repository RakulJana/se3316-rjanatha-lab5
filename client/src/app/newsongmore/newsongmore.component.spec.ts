import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsongmoreComponent } from './newsongmore.component';

describe('NewsongmoreComponent', () => {
  let component: NewsongmoreComponent;
  let fixture: ComponentFixture<NewsongmoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsongmoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsongmoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
