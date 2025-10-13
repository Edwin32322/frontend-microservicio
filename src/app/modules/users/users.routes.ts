import { Routes } from '@angular/router';
import UsersListPageComponent from './pages/users-list-page/users-list-page.component';

export const userRoutes: Routes = [
{
    path: "list",
    component: UsersListPageComponent
},
{
    path: "**",
    redirectTo: "list"
}
]