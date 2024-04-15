import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { FormComponent } from '../../../lib/helpers/form-component';
import { IPermission } from '../../../../model/permission';

@Component({
  selector: 'app-permission-form',
  standalone: true,
  imports: [
    MatCardModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    CommonModule,
    MatButtonModule,
    MatInputModule,
    RouterModule
  ],
  templateUrl: './permission-form.component.html',
  styleUrl: './permission-form.component.scss'
})
export class PermissionFormComponent extends FormComponent<IPermission> implements OnChanges {
  @Input() permissionObject!: IPermission | null;
  @Output() savePermission = new EventEmitter<IPermission>();

  permissionForm: FormGroup = new FormGroup({
    id: new FormControl<string>(''),
    name: new FormControl<string>('')
  });

  ngOnChanges(): void {
    if (this.permissionObject) {
      this.permissionForm.patchValue(this.permissionObject);
    }
  }

  savePermissionClicked($event: Event): void {
    $event.preventDefault();
    this.savePermission.emit(this.permissionForm.value);
  }
}
