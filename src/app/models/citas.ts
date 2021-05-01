import { Time } from "@angular/common";

export interface CitaI {
    id: number,
    dni_usuario: string;
    estado: string;
    fecha: Date;
    hora: Time;
    medico: string;
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