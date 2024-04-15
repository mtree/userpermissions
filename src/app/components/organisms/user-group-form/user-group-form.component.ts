import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule } from '@angular/router';
import { FormComponent } from '../../../lib/helpers/form-component';
import { IUserGroup } from '../../../../model/user-group';
import { ListResponse } from '../../../../model/api/list-response';
import { Observable } from 'rxjs';
import { IPermission } from '../../../../model/permission';

@Component({
  selector: 'app-user-group-form',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    RouterModule
  ],
  templateUrl: './user-group-form.component.html',
  styleUrl: './user-group-form.component.scss'
})
export class UserGroupFormComponent extends FormComponent<IUserGroup> implements OnChanges {
  @Input() userGroupObject!: IUserGroup | null;
  @Input() permissionOptions$!: Observable<ListResponse<IPermission>>;
  @Output() saveUserGroup = new EventEmitter<IUserGroup>();

  userGroupForm: FormGroup = new FormGroup({
    id: new FormControl<string>(''),
    name: new FormControl<string>(''),
    permissions: new FormControl<Array<IPermission>>([]),
    negativePermissions: new FormControl<Array<IPermission>>([])
  });

  ngOnChanges(): void {
    if (this.userGroupObject) {
      this.userGroupForm.patchValue(this.userGroupObject);
    }
  }

  saveUserGroupClicked($event: Event): void {
    $event.preventDefault();
    this.saveUserGroup.emit(this.userGroupForm.value);
  }
}
