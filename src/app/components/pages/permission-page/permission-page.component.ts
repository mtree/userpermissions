import { Component, inject } from '@angular/core';
import { PermissionListComponent } from "../../organisms/permission-list/permission-list.component";
import { NavigationComponent } from "../../atoms/navigation/navigation.component";
import { IApiService } from '../../../lib/api/api.service';
import { API_SERVICE_TOKEN } from '../../../app.component';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import { ListResponse } from '../../../../model/api/list-response';
import { IPermission } from '../../../../model/permission';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-permission-page',
    standalone: true,
    templateUrl: './permission-page.component.html',
    styleUrl: './permission-page.component.scss',
    imports: [PermissionListComponent, NavigationComponent, MatButtonModule]
})
export class PermissionPageComponent {
    private apiService: IApiService = inject(API_SERVICE_TOKEN);
    private router: Router = inject(Router);
  
  
    private refreshPermissions: BehaviorSubject<null> = new BehaviorSubject<null>(null);
    permissionList$: Observable<ListResponse<IPermission>> = this.refreshPermissions.pipe(
      switchMap(() => this.apiService.getPermissions())
    );
  
    handleDeletePermission(id: string): void {
      this.apiService.deletePermission(id)
        .subscribe(() => {
          this.refreshPermissions.next(null);
        });
    }
  
    handleUpdatePermission(id: string): void {
      this.router.navigate(['/permissions/modify', { id }]);
    }
  
    handleAddPermission(): void {
      this.router.navigate(['/permissions/modify']);
    }
}
