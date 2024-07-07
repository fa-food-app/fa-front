export interface PropiedadesTermicas {
    conductivity: Atrribute;
    difusivity:   Atrribute;
    density:      Atrribute;
    specifici:    Atrribute;
}

export interface Atrribute {
    component:        number;
    temperatureGraph: TemperatureGraph[];
    humedityGraph:    any[];
}

export interface TemperatureGraph {
    x: number;
    y: number;
}
