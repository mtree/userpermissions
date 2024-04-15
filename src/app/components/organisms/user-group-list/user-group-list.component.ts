import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { ListIterablePipe } from '../../../lib/pipes/list-iterable.pipe';
import { Observable } from 'rxjs';
import { IUserGroup } from '../../../../model/user-group';
import { ListResponse } from '../../../../model/api/list-response';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-user-group-list',
  standalone: true,
  templateUrl: './user-group-list.component.html',
  styleUrl: './user-group-list.component.scss',
  imports: [CommonModule, MatTableModule, MatIconModule, MatMenuModule, ListIterablePipe, MatButtonModule]
})
export class UserGroupListComponent {
  @Input() userGroupList!: Observable<ListResponse<IUserGroup>>;
  @Output() deleteUserGroup = new EventEmitter<string>();
  @Output() updateUserGroup = new EventEmitter<string>();

  displayedColumns: string[] = ['id', 'name', 'permissions', 'actions'];

  deleteUserGroupClicked(id: string): void {
    this.deleteUserGroup.emit(id);
  }

  updateUserGroupClicked(id: string): void {
    this.updateUserGroup.emit(id);
  }
}
