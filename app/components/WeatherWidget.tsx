"use client";

import { useState, useEffect } from "react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/app/components/ui/card";
import { Sun, Cloud, CloudRain, Loader2 } from "lucide-react";

type WeatherData = {
    temperature: number;
    condition: "sunny" | "cloudy" | "rainy";
};

export function WeatherWidget() {
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simular una llamada a la API del clima
        const fetchWeather = async () => {
            setLoading(true);
            // En una implementación real, aquí harías una llamada a una API de clima
            await new Promise((resolve) => setTimeout(resolve, 1000)); // Simular delay de red

            // Datos de ejemplo
            const mockWeather: WeatherData = {
                temperature: Math.floor(Math.random() * (30 - 15 + 1)) + 15, // Temperatura entre 15 y 30
                condition: ["sunny", "cloudy", "rainy"][
                    Math.floor(Math.random() * 3)
                ] as WeatherData["condition"],
            };

            setWeather(mockWeather);
            setLoading(false);
        };

        fetchWeather();
    }, []);

    const getWeatherIcon = (condition: WeatherData["condition"]) => {
        switch (condition) {
            case "sunny":
                return <Sun className="h-6 w-6 text-yellow-500" />;
            case "cloudy":
                return <Cloud className="h-6 w-6 text-gray-500" />;
            case "rainy":
                return <CloudRain className="h-6 w-6 text-blue-500" />;
        }
    };

    if (loading) {
        return (
            <Card>
                <CardContent className="flex items-center justify-center p-6">
                    <Loader2 className="h-6 w-6 animate-spin" />
                </CardContent>
            </Card>
        );
    }

    if (!weather) {
        return null;
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center">
                    {getWeatherIcon(weather.condition)}
                    <span className="ml-2">Clima de hoy</span>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-2xl font-bold">{weather.temperature}°C</p>
                <p className="capitalize">{weather.condition}</p>
            </CardContent>
        </Card>
    );
}
