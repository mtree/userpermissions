import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ListIterablePipe } from '../../../lib/pipes/list-iterable.pipe';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { PermissionsDisplayComponent } from '../../atoms/permissions-display/permissions-display.component';
import { Observable } from 'rxjs';
import { ListResponse } from '../../../../model/api/list-response';
import { IPermission } from '../../../../model/permission';

@Component({
  selector: 'app-permission-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    ListIterablePipe,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    PermissionsDisplayComponent
  ],
  templateUrl: './permission-list.component.html',
  styleUrl: './permission-list.component.scss'
})
export class PermissionListComponent {
  @Input() permissionList!: Observable<ListResponse<IPermission>>;
  @Output() deletePermission = new EventEmitter<string>();
  @Output() updatePermission = new EventEmitter<string>();

  displayedColumns: string[] = ['id', 'name', 'actions'];

  deletePermissionClicked(id: string): void {
    this.deletePermission.emit(id);
  }

  updatePermissionClicked(id: string): void {
    this.updatePermission.emit(id);
  }
}
