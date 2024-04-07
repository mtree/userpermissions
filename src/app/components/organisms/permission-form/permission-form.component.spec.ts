import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PermissionFormComponent } from './permission-form.component';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('PermissionFormComponent', () => {
  let component: PermissionFormComponent;
  let fixture: ComponentFixture<PermissionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        PermissionFormComponent,
        MatCardModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        CommonModule,
        MatButtonModule,
        MatInputModule,
        BrowserAnimationsModule,
        RouterModule.forRoot([])
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PermissionFormComponent);
    component = fixture.componentInstance;

    component.permissionObject = {
      id: '',
      name: '',
    }

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
