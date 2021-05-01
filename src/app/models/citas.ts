import { Time } from "@angular/common";

export interface CitaI {
<<<<<<< HEAD
    id: number,
    dni_usuario: string;
    estado: string;
    fecha: Date;
    hora: Time;
    medico: string;
    lugar: string;
=======
    dniUsuarioAsociado: string;
    estado: string;
    fecha: string;
    hora: string;
    lugar: string;
    medicoAsociado: string;
>>>>>>> dc82f87... Merge branch 'develop' of https://github.com/leoroqueb/CitasMDA into feature/aforo
}

export interface HorariosI {
    hora: string;
    aforo?: string;
}

export interface AforoI {
    actual: number;
    maximo?: number;
}