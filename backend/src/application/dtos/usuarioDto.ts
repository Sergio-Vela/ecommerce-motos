export interface UsuarioCreateData {
    nombre: string;
    apellido: string;
    correo: string;
    password: string;
    telefono: string;
    direccion: string;
    rol: string;
    estadoId: number;
}

export interface UsuarioUpdateData {
    nombre?: string;
    apellido?: string;
    correo?: string;
    password?: string;
    telefono?: string;
    direccion?: string;
    rol?: string;
    estadoId?: number;
}