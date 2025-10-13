import { Component } from '@angular/core';
import { UsersTableComponent } from "../../components/users-table/users-table.component";

@Component({
  selector: 'app-users-list-page',
  standalone: true,
  imports: [UsersTableComponent],
  templateUrl: './users-list-page.component.html',
  styleUrl: './users-list-page.component.scss'
})
export default class UsersListPageComponent {

}
