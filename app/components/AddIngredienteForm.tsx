"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";

type Ingrediente = {
    nombre: string;
    cantidad: number;
    disponible: boolean;
};

type AddIngredienteFormProps = {
    onAdd: (ingrediente: Ingrediente) => void;
};

export function AddIngredienteForm({ onAdd }: AddIngredienteFormProps) {
    const [nombre, setNombre] = useState("");
    const [cantidad, setCantidad] = useState(0);
    const [disponible, setDisponible] = useState(true);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onAdd({ nombre, cantidad, disponible });
        setNombre("");
        setCantidad(0);
        setDisponible(true);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="nombre">Nombre</Label>
                <Input
                    id="nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                />
            </div>
            <div className="space-y-2">
                <Label htmlFor="cantidad">Cantidad</Label>
                <Input
                    id="cantidad"
                    type="number"
                    value={cantidad}
                    onChange={(e) => setCantidad(parseInt(e.target.value))}
                    required
                />
            </div>
            <div className="flex items-center space-x-2">
                <Switch
                    id="disponible"
                    checked={disponible}
                    onCheckedChange={setDisponible}
                />
                <Label htmlFor="disponible">Disponible</Label>
            </div>
            <Button type="submit">Agregar Ingrediente</Button>
        </form>
    );
}
