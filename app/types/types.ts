export interface WeatherData {
    temperature: number;
    condition: "soleado" | "nublado" | "lluvioso" | "tormenta";
    humidity?: number;
    windSpeed?: number;
    windDeg?: number;
}

export type Ingrediente = {
    id: number;
    nombre: string;
    cantidad: number;
    disponible: boolean;
};

export type Propiedad = {
    id: number;
    nombre: string;
    tipo: string;
    estado: boolean;
    group_id: null | number;
};

export type PropiedadGrupo = {
    id: number;
    nombre: string;
    tipo?: string;
};
