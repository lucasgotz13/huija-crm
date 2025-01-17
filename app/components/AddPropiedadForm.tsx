"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";

type Propiedad = {
    nombre: string;
    tipo: string;
    estado: boolean;
};

type PropiedadFormProps = {
    onAdd: (propiedad: Propiedad) => void;
};

export function PropiedadForm({ onAdd }: PropiedadFormProps) {
    const [nombre, setNombre] = useState<string>("");
    const [tipo, setTipo] = useState<string>("");
    const [estado, setEstado] = useState<boolean>(true);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setNombre("");
        setTipo("");
        setEstado(true);
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
                <Label htmlFor="cantidad">Tipo</Label>
                <Input
                    id="cantidad"
                    type="text"
                    value={tipo}
                    onChange={(e) => setTipo(e.target.value)}
                    required
                />
            </div>
            <div className="flex items-center space-x-2">
                <Switch
                    id="disponible"
                    checked={estado}
                    onCheckedChange={setEstado}
                />
                <Label htmlFor="disponible">Disponible</Label>
            </div>
            <Button type="submit">Agregar Propiedad</Button>
        </form>
    );
}
