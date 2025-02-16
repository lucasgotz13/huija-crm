"use client";

import { useState, useEffect } from "react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/app/components/ui/card";
import { Sun, Cloud, CloudRain, Loader2 } from "lucide-react";
import { WeatherData } from "../types/types";

export function WeatherWidget() {
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchWeather = async () => {
            setLoading(true);
            try {
                const response = await fetch(
                    `https://api.openweathermap.org/data/2.5/weather?q=Mar%20Del%20Plata&units=metric&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`
                );
                const data = await response.json();

                const weatherData: WeatherData = {
                    temperature: Math.round(data.main.temp),
                    condition: mapWeatherCondition(data.weather[0].id),
                    humidity: data.main.humidity,
                    windSpeed: Math.round(data.wind.speed),
                    windDeg: Math.round(data.wind.deg),
                };

                setWeather(weatherData);
            } catch (error) {
                console.error("Error fetching weather:", error);
                setWeather({
                    temperature: 20,
                    condition: "soleado",
                });
            } finally {
                setLoading(false);
            }
        };

        fetchWeather();
    }, []);

    const getWeatherIcon = (condition: WeatherData["condition"]) => {
        switch (condition) {
            case "soleado":
                return <Sun className="h-6 w-6 text-yellow-500" />;
            case "nublado":
                return <Cloud className="h-6 w-6 text-gray-500" />;
            case "lluvioso":
            case "tormenta":
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
                <p>Humedad: {weather.humidity}</p>
                <p>
                    Viento: {weather.windSpeed} m/s{" "}
                    {getWindDirection(weather.windDeg ?? 0)}
                </p>
            </CardContent>
        </Card>
    );
}

const mapWeatherCondition = (weatherId: number): WeatherData["condition"] => {
    if (weatherId >= 200 && weatherId < 300) return "tormenta";
    if (weatherId >= 300 && weatherId < 600) return "lluvioso";
    if (weatherId >= 800 && weatherId < 803) return "soleado";
    return "nublado";
};

const getWindDirection = (degrees: number): string => {
    const directions = ["N", "NE", "E", "SE", "S", "SO", "O", "NO"];
    const index = Math.round((((degrees % 360) + 360) % 360) / 45) % 8;
    return directions[index];
};
