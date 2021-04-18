export interface UsuariosI {
    dni: string;
    nombre: string;
    apellidos: string;
    ss: string;
    direccion: string;
    email: string;
    genero: string;
    telefono: string;
}

export interface CitasI {
    dniUsuarioAsociado: string;
    estado: string;
    fecha: string;
    medicoAsociado: string;
    lugar: string;
}

export interface HorariosI {
    hora: string;
    aforo?: string;
}

export interface AforoI {
    actual: number;
    maximo?: number;
}