import { Routes } from '@angular/router';
import { UserPageComponent } from './components/pages/user-page/user-page.component';
import { UserModifyPageComponent } from './components/pages/user-modify-page/user-modify-page.component';
import { PermissionPageComponent } from './components/pages/permission-page/permission-page.component';
import { PermissionModifyPageComponent } from './components/pages/permission-modify-page/permission-modify-page.component';
import { UserGroupPageComponent } from './components/pages/user-group-page/user-group-page.component';
import { UserGroupModifyPageComponent } from './components/pages/user-group-modify-page/user-group-modify-page.component';

export const routes: Routes = [
  { path: '', component: UserPageComponent },
  { path: 'users', component: UserPageComponent },
  { path: 'users/modify', component: UserModifyPageComponent },
  { path: 'users/modify/:id', component: UserModifyPageComponent },
  { path: 'permissions', component: PermissionPageComponent },
  { path: 'permissions/modify', component: PermissionModifyPageComponent },
  { path: 'permissions/modify/:id', component: PermissionModifyPageComponent },
  { path: 'user-groups', component: UserGroupPageComponent },
  { path: 'user-groups/modify', component: UserGroupModifyPageComponent },
  { path: 'user-groups/modify/:id', component: UserGroupModifyPageComponent }
];
