import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { IUser } from '../../../../model/user';
import { IPermission } from '../../../../model/permission';
import { IUserGroup } from '../../../../model/user-group';
import { Observable } from 'rxjs';
import { ListResponse } from '../../../../model/api/list-response';
import { CommonModule } from '@angular/common';
import { FormComponent } from '../../../lib/helpers/form-component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-user-form',
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
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss'
})
export class UserFormComponent extends FormComponent<IUser> implements OnChanges {
  @Input() userObject!: IUser | null;
  @Input() permissionOptions$!: Observable<ListResponse<IPermission>>;
  @Input() userGroupOptions$!: Observable<ListResponse<IUserGroup>>;
  @Output() saveUser = new EventEmitter<IUser>();

  userForm: FormGroup = new FormGroup({
    id: new FormControl<string>(''),
    name: new FormControl<string>(''),
    permissions: new FormControl<Array<IPermission>>([]),
    negativePermissions: new FormControl<Array<IPermission>>([]),
    userGroups: new FormControl<Array<IUserGroup>>([])
  });;

  ngOnChanges(): void {
    if (this.userObject) {
      this.userForm.patchValue(this.userObject);
    }
  }

  saveUserClicked($event: Event): void {
    $event.preventDefault();
    this.saveUser.emit(this.userForm.value);
  }
}
