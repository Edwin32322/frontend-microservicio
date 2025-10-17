import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from './user.service';
import { environment } from '../../../../environments/environment';
import { User, UserCreateOrUpdate } from '../models/user.model';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;
  const apiUrl = environment.apiUrl;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService]
    });

    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('debería crearse el servicio', () => {
    expect(service).toBeTruthy();
  });

  it('debería obtener los usuarios con getUsers()', () => {
    const mockUsers: User[] = [
      { id: 1, nombre: 'Alberto', correo:"alber@gmail.com", edad:22},
      { id: 2, nombre: 'Hernando', correo:"hernando@gmail.com", edad:50 }
    ];

    service.getUsers().subscribe(users => {
      expect(users).toEqual(mockUsers);
    });

    const req = httpMock.expectOne(apiUrl + 'api/data');
    expect(req.request.method).toBe('GET');
    req.flush({status: "success", data: mockUsers});
  });

  it('debería actualizar un usuario con updateUser()', () => {
    const mockUser: User = { id: 1, nombre: 'Alberto', correo:"alber@gmail.com", edad:22};
    const payload: UserCreateOrUpdate = { nombre: 'Alberto', correo:"alber@gmail.com", edad:22};

    service.updateUser(1, payload).subscribe(user => {
      expect(user).toEqual(mockUser);
    });

    const req = httpMock.expectOne(apiUrl + 'api/data/1');
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(payload );
    req.flush({status: "success", data: mockUser});
  });

  it('debería crear un usuario con createUser()', () => {
    const payload: UserCreateOrUpdate = { nombre: 'Pedro', correo:"ped@gmail.com", edad:12 } as UserCreateOrUpdate;
    const mockUser: User = { id: 3, nombre: 'Iglesias', correo:"inglesias@gmail.com" ,edad: 22} as User;

    service.createUser(payload).subscribe(user => {
      expect(user).toEqual(mockUser);
    });

    const req = httpMock.expectOne(apiUrl + 'api/data');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(payload);
    req.flush({status: "success", data: mockUser});
  });

  it('debería eliminar usuarios con deleteUsers()', () => {
    const ids = [1, 2, 3];

    service.deleteUsers(ids).subscribe(response => {
          expect(response).toEqual({
          status: 'success',
          data: { deletedCount: 3 }
      });
    });

    const req = httpMock.expectOne(apiUrl + 'api/data/delete-users');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ usersIds: ids });
    req.flush({ status: 'success', data: { deletedCount: 3 } });
  });
});
