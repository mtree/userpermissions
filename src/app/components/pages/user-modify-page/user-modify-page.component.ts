import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserFormComponent } from '../../organisms/user-form/user-form.component';
import { IApiService } from '../../../lib/api/api.interface';
import { API_SERVICE_TOKEN } from '../../../app.component';
import { IUser } from '../../../../model/user';

@Component({
  selector: 'app-user-modify-page',
  standalone: true,
  templateUrl: './user-modify-page.component.html',
  styleUrl: './user-modify-page.component.scss',
  imports: [UserFormComponent]
})
export class UserModifyPageComponent implements OnInit {
  private route: ActivatedRoute = inject(ActivatedRoute);
  private apiService: IApiService = inject(API_SERVICE_TOKEN);
  private router: Router = inject(Router);

  private userId: string | null | undefined;
  userData: IUser | null = {
    id: '',
    name: '',
    permissions: [],
    negativePermissions: [],
    userGroups: []
  };
  permissionOptions$ = this.apiService.getPermissions();
  userGroupOptions$ = this.apiService.getUserGroups();

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id');

    if (this.userId) {
      this.apiService.getUser(this.userId).subscribe(user => {
        this.userData = user.data;
      });
    }
  }

  handleSaveUser(user: IUser): void {
    this.apiService.upsertUser(user).subscribe(() => {
      this.router.navigate(['/users']);
    });
  }
}
