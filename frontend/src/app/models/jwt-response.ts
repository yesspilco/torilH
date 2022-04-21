export interface JwtResponse {
    dataUser: {
        codigoId: string,
        nombre: string,
        apellido: string,
        rol: number,
        email: string
        accessToken: string,
        expiresIn: string,
    };
    admin: {
        codigoId: string,
        nombre: string,
        apellido: string,
        accessToken: string,
        expiresIn: string,
        rol: string,
        email: string
    };
    code: {
        email: number,
        userName: number
        status: number,
        msj: string,
    };
}
