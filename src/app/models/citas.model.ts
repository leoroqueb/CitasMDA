
export interface CitaI {
    dniUsuarioAsociado: string;
    estado: string;
    fecha: string;
    hora: string;
    lugar: string;
    medicoAsociado: string;
}

export interface HorariosI {
    hora: string;
    aforo?: string;
}

export interface CitasArrayI{
    pendientes: CitaI[];
    modificadas: CitaI[];
    finalizadas: CitaI[];
}

export interface AforoI {
    actual: number;
    maximo?: number;
}