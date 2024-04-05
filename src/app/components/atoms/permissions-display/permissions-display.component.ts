import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
import { IUser } from '../../../../model/user';
import { CommonModule } from '@angular/common';
import { AdnotatedPermission, PermissionStatus, UserService } from '../../../lib/services/user.service';

@Component({
  selector: 'app-permissions-display',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './permissions-display.component.html',
  styleUrl: './permissions-display.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PermissionsDisplayComponent {
  private userService: UserService = inject(UserService);
  @Input() user!: IUser;
  public PermissionStatus = PermissionStatus;

  get permissions(): Array<AdnotatedPermission> {
    return this.userService.getAdnotatedPermissions(this.user);
  }
}
