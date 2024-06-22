import { TipoPlan } from "../enum/tipo-plan";

export interface Plan{
    nombre:string;
    caracteristicas:string[];
    precio:number;
    duracion:number;
    tipoDePlan:TipoPlan;
    activo:boolean;
    id?:string;
    fechaRegistro?:Date;
    fechaActualizacion?:Date;
}