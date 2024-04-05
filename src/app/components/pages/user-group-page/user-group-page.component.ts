import { Component, inject } from '@angular/core';
import { NavigationComponent } from "../../atoms/navigation/navigation.component";
import { UserGroupListComponent } from "../../organisms/user-group-list/user-group-list.component";
import { IApiService } from '../../../lib/api/api.service';
import { API_SERVICE_TOKEN } from '../../../app.component';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import { ListResponse } from '../../../../model/api/list-response';
import { IUserGroup } from '../../../../model/user-group';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-user-group-page',
    standalone: true,
    templateUrl: './user-group-page.component.html',
    styleUrl: './user-group-page.component.scss',
    imports: [NavigationComponent, UserGroupListComponent, MatButtonModule]
})
export class UserGroupPageComponent {
    private apiService: IApiService = inject(API_SERVICE_TOKEN);
    private router: Router = inject(Router);
  
  
    private refreshUserGroups: BehaviorSubject<null> = new BehaviorSubject<null>(null);
    userGroupList$: Observable<ListResponse<IUserGroup>> = this.refreshUserGroups.pipe(
      switchMap(() => this.apiService.getUserGroups())
    );
  
    handleDeleteUserGroup(id: string): void {
      this.apiService.deleteUserGroup(id)
        .subscribe(() => {
          this.refreshUserGroups.next(null);
        });
    }
  
    handleUpdateUserGroup(id: string): void {
      this.router.navigate(['/user-groups/modify', { id }]);
    }
  
    handleAddUserGroup(): void {
      this.router.navigate(['/user-groups/modify']);
    }
}
