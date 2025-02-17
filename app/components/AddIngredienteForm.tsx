"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";
import { useFormStatus } from "react-dom";
import type { Ingrediente } from "../types/types";

// type Ingrediente = {
//     id?: string | number;
//     nombre: string;
//     cantidad: number;
//     disponible: boolean;
// };

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button className="w-full" type="submit" disabled={pending}>
            {pending ? "Cargando..." : "Editar ingrediente"}
        </Button>
    );
}

export function AddIngredienteForm({
    accion,
    ingrediente = null,
}: {
    accion: any;
    ingrediente: Ingrediente | null;
}) {
    const [id, setId] = useState<string | number>(ingrediente?.id ?? "");
    const [nombre, setNombre] = useState<string>(ingrediente?.nombre ?? "");
    const [cantidad, setCantidad] = useState<number>(
        ingrediente?.cantidad ?? 0
    );
    const [disponible, setDisponible] = useState<boolean>(
        ingrediente?.disponible ?? true
    );

    return (
        <form action={accion} className="space-y-4">
            <input type="hidden" id="id" name="id" value={id} />
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
                <Label htmlFor="cantidad">Cantidad</Label>
                <Input
                    id="cantidad"
                    type="number"
                    name="cantidad"
                    value={cantidad}
                    onChange={(e) => setCantidad(parseInt(e.target.value))}
                    required
                />
            </div>
            <div className="flex items-center space-x-2">
                <Switch
                    id="disponible"
                    name="disponible"
                    checked={disponible}
                    onCheckedChange={setDisponible}
                />
                <Label htmlFor="disponible">Disponible</Label>
            </div>
            <SubmitButton />
        </form>
    );
}
