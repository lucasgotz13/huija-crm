"use client";

import { useState } from "react";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";

type EstadoRestaurante = {
    [key: string]: boolean;
};

export function EncargadoDashboard() {
    const [estado, setEstado] = useState<EstadoRestaurante>({
        cocinaLimpia: true,
        salonPreparado: false,
        personalCompleto: true,
        stockSuficiente: false,
        equiposFuncionando: true,
    });

    const toggleEstado = (key: string) => {
        setEstado((prevEstado) => ({
            ...prevEstado,
            [key]: !prevEstado[key],
        }));
    };

    return (
        <div className="space-y-4">
            {Object.entries(estado).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                    <Label htmlFor={key} className="text-lg">
                        {key
                            .replace(/([A-Z])/g, " $1")
                            .replace(/^./, (str) => str.toUpperCase())}
                    </Label>
                    <Switch
                        id={key}
                        checked={value}
                        onCheckedChange={() => toggleEstado(key)}
                    />
                </div>
            ))}
        </div>
    );
}
