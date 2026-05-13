export interface UsuarioDto {
    id?: number;
    nombre: string;
    apellido: string;
    correo: string;
    telefono: string;
    direccion: string;
    rol: 'admin' | 'cliente';
    estadoId: number;
    password: string;
}
