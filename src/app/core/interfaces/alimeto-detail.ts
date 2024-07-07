import { Categoria } from "./categoria.interface";

export interface AlimentoDetail{
    id:string;
    nombre: string;
    categoria: Categoria;
    parteAnalizada: string;
    humedad: number;
    energiaKcal: number;
    energiakJ: number;
    proteinaG: number;
    lipidosG: number;
    carbohidratosTotal: number;
    carbohidratosDisp: number;
    fibraDietaria: number;
    cenizas: number;
    //minerales
    calcio: number;
    hierro: number;
    sodio: number;
    fosforo: number;
    yodo: number;
    zinc: number;
    magnesio: number;
    potasio: number;
    //vitaminas
    tiamina: number;
    riboflaxina: number;
    niaxina: number;
    folatos: number;
    vitaminaB12: number;
    vitaminaA: number;
    vitaminaC: number;
    //acido graso
    grasaSaturada: number;
    grasaMenosSaturada: number;
    grasaPoliinsaturada: number;
    colesterol: number;
    parteComestible: number;
    activo:boolean;
    fechaRegistro:Date;
}