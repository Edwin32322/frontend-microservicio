export interface User{
    id: number,
    nombre: string,
    correo: string,
    edad: number,
}

export interface UserCreateOrUpdate{
    nombre: string,
    correo: string,
    edad: number,
}