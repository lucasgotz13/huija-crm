export interface WeatherData {
    temperature: number;
    condition: "soleado" | "nublado" | "lluvioso" | "tormenta";
    humidity?: number;
    windSpeed?: number;
    windDeg?: number;
}
