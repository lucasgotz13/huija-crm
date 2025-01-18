"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";
import { addPropiedad } from "../(main)/encargado/actions";

type Propiedad = {
    nombre: string;
    tipo: string;
    estado: boolean;
};

type PropiedadFormProps = {
    onAdd: (propiedad: Propiedad) => void;
};

export function PropiedadForm() {
    const [nombre, setNombre] = useState<string>("");
    const [tipo, setTipo] = useState<string>("");
    const [estado, setEstado] = useState<boolean>(true);

    return (
        <form action={addPropiedad} className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="nombre">Nombre</Label>
                <Input
                    id="nombre"
                    value={nombre}
                    name="nombre"
                    onChange={(e) => setNombre(e.target.value)}
                    required
                />
            </div>
            <div className="space-y-2">
                <Label htmlFor="tipo">Tipo</Label>
                <Input
                    id="tipo"
                    name="tipo"
                    type="text"
                    value={tipo}
                    onChange={(e) => setTipo(e.target.value)}
                    required
                />
            </div>
            <div className="flex items-center space-x-2">
                <Switch
                    id="estado"
                    name="estado"
                    checked={estado}
                    onCheckedChange={setEstado}
                />
                <Label htmlFor="estado">Disponible</Label>
            </div>
            <Button type="submit">Agregar Propiedad</Button>
        </form>
    );
}
