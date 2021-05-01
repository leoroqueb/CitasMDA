import { Time } from "@angular/common";

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

export interface AforoI {
    actual: number;
    maximo?: number;
}