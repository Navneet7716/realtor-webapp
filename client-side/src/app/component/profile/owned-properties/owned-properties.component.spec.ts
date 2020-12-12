import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnedPropertiesComponent } from './owned-properties.component';

describe('OwnedPropertiesComponent', () => {
  let component: OwnedPropertiesComponent;
  let fixture: ComponentFixture<OwnedPropertiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OwnedPropertiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnedPropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
