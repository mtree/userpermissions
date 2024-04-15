import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { API_SERVICE_TOKEN } from '../../../app.component';
import { IApiService } from '../../../lib/api/api.interface';
import { IPermission } from '../../../../model/permission';
import { PermissionFormComponent } from '../../organisms/permission-form/permission-form.component';

@Component({
  selector: 'app-permission-modify-page',
  standalone: true,
  templateUrl: './permission-modify-page.component.html',
  styleUrl: './permission-modify-page.component.scss',
  imports: [PermissionFormComponent]
})
export class PermissionModifyPageComponent implements OnInit {
  private route: ActivatedRoute = inject(ActivatedRoute);
  private apiService: IApiService = inject(API_SERVICE_TOKEN);
  private router: Router = inject(Router);

  private permissionId: string | null | undefined;
  permissionData: IPermission | null = {
    id: '',
    name: ''
  };

  ngOnInit(): void {
    this.permissionId = this.route.snapshot.paramMap.get('id');

    if (this.permissionId) {
      this.apiService.getPermission(this.permissionId).subscribe(permission => {
        this.permissionData = permission.data;
      });
    }
  }

  handleSavePermission(permission: IPermission): void {
    this.apiService.upsertPermission(permission).subscribe(() => {
      this.router.navigate(['/permissions']);
    });
  }
}
