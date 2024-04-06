import { Component, OnInit, inject } from '@angular/core';
import { UserGroupFormComponent } from "../../organisms/user-group-form/user-group-form.component";
import { ActivatedRoute, Router } from '@angular/router';
import { API_SERVICE_TOKEN } from '../../../app.component';
import { IApiService } from '../../../lib/api/api.interface';
import { IUserGroup } from '../../../../model/user-group';

@Component({
    selector: 'app-user-group-modify-page',
    standalone: true,
    templateUrl: './user-group-modify-page.component.html',
    styleUrl: './user-group-modify-page.component.scss',
    imports: [UserGroupFormComponent]
})
export class UserGroupModifyPageComponent implements OnInit {
    private route: ActivatedRoute = inject(ActivatedRoute);
    private apiService: IApiService = inject(API_SERVICE_TOKEN);
    private router: Router = inject(Router);
  
    private userGroupId: string | null | undefined;
    userGroupData: IUserGroup | null = {
      id: '',
      name: '',
      permissions: [],
      negativePermissions: []
    };
    permissionOptions$ = this.apiService.getPermissions();
  
    ngOnInit(): void {
      this.userGroupId = this.route.snapshot.paramMap.get('id');
  
      if (this.userGroupId) {
        this.apiService.getUserGroup(this.userGroupId)
          .subscribe(user => {
            this.userGroupData = user.data;
          });
      }
    }
  
    handleSaveUserGroup(userGroup: IUserGroup): void {
      this.apiService.upsertUserGroup(userGroup)
        .subscribe(() => {
          this.router.navigate(['/user-groups']);
        });
    }
  
}
