import { Component, OnInit, inject } from '@angular/core';
import { IApiService } from '../../../lib/api/api.service';
import { API_SERVICE_TOKEN } from '../../../app.component';
import { BehaviorSubject, Observable, Subject, of, switchMap } from 'rxjs';
import { ListResponse } from '../../../../model/api/list-response';
import { IUser } from '../../../../model/user';
import { UserListComponent } from "../../organisms/user-list/user-list.component";
import { UserFormComponent } from "../../organisms/user-form/user-form.component";
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { NavigationComponent } from "../../atoms/navigation/navigation.component";

@Component({
    selector: 'app-user-page',
    standalone: true,
    templateUrl: './user-page.component.html',
    styleUrl: './user-page.component.scss',
    imports: [UserListComponent, UserFormComponent, MatButtonModule, MatCardModule, NavigationComponent]
})
export class UserPageComponent {
  private apiService: IApiService = inject(API_SERVICE_TOKEN);
  private router: Router = inject(Router);


  private refreshUsers: BehaviorSubject<null> = new BehaviorSubject<null>(null);
  userList$: Observable<ListResponse<IUser>> = this.refreshUsers.pipe(
    switchMap(() => this.apiService.getUsers())
  );

  handleDeleteUser(id: string): void {
    this.apiService.deleteUser(id)
      .subscribe(() => {
        this.refreshUsers.next(null);
      });
  }

  handleUpdateUser(id: string): void {
    this.router.navigate(['/users/modify', { id }]);
  }

  handleAddUser(): void {
    this.router.navigate(['/users/modify']);
  }
}
