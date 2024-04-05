import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermissionModifyPageComponent } from './permission-modify-page.component';

describe('PermissionModifyPageComponent', () => {
  let component: PermissionModifyPageComponent;
  let fixture: ComponentFixture<PermissionModifyPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PermissionModifyPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PermissionModifyPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
