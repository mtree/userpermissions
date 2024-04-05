import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponse } from '../../../../model/api/list-response';
import { IUser } from '../../../../model/user';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table'
import { ListIterablePipe } from "../../../lib/pipes/list-iterable.pipe";
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { PermissionsDisplayComponent } from '../../atoms/permissions-display/permissions-display.component';

@Component({
    selector: 'app-user-list',
    standalone: true,
    templateUrl: './user-list.component.html',
    styleUrl: './user-list.component.scss',
    imports: [
        CommonModule,
        MatTableModule,
        ListIterablePipe,
        MatButtonModule,
        MatIconModule,
        MatMenuModule,
        PermissionsDisplayComponent
    ]
})
export class UserListComponent {
  @Input() userList!: Observable<ListResponse<IUser>>;
  @Output() deleteUser = new EventEmitter<string>();
  @Output() updateUser = new EventEmitter<string>();
  
  displayedColumns: string[] = ['id', 'name', 'permissions', 'userGroups', 'actions'];

  deleteUserClicked(id: string): void {
    this.deleteUser.emit(id);
  }

  updateUserClicked(id: string): void {
    this.updateUser.emit(id);
  }
}
