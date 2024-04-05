import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermissionsDisplayComponent } from './permissions-display.component';

describe('PermissionsDisplayComponent', () => {
  let component: PermissionsDisplayComponent;
  let fixture: ComponentFixture<PermissionsDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PermissionsDisplayComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PermissionsDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
