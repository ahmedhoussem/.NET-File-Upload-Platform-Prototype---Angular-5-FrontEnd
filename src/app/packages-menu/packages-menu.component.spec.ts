import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PackagesMenuComponent } from './packages-menu.component';

describe('PackagesMenuComponent', () => {
  let component: PackagesMenuComponent;
  let fixture: ComponentFixture<PackagesMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PackagesMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PackagesMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
