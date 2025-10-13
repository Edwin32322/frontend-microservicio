import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User, UserCreateOrUpdate } from '../models/user.model';
import { environment } from '../../../../environments/environment';

export interface ApiResponse<T> {
  status: string;
  data: T;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly http = inject(HttpClient);

  getUsers(): Observable<User[]> {
    return this.http.get<ApiResponse<User[]>>(environment.apiUrl + 'api/data')
      .pipe(
        map((res: ApiResponse<User[]>) => res.data)
      );
  }

  updateUser(userId: number, userPayload: UserCreateOrUpdate): Observable<User> {
    return this.http.put<ApiResponse<User>>(
      `${environment.apiUrl}api/data/${userId}`,
      userPayload 
    ).pipe(
      map((res: ApiResponse<User>) => res.data)
    );
  }

  createUser(userPayload: UserCreateOrUpdate): Observable<User> {
    return this.http.post<ApiResponse<User>>(
      environment.apiUrl + 'api/data',
      userPayload 
    ).pipe(
      map((res: ApiResponse<User>) => res.data)
    );
  }

  deleteUsers(usersIds: number[]): Observable<ApiResponse<{ deletedCount: number }>> {
    return this.http.post<ApiResponse<{ deletedCount: number }>>(
      environment.apiUrl + 'api/data/delete-users',
      { usersIds }
    );
  }
}
