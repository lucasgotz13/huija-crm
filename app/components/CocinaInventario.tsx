"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "./ui/dialog";
import { addIngrediente } from "../(main)/cocina/actions";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";
import CocinaItem from "./CocinaItem";
import { useFormState } from "react-dom";

type Ingrediente = {
    id: number;
    nombre: string;
    cantidad: number;
    disponible: boolean;
};

const initialState = {
    success: "",
    errors: {
        nombre: "",
        cantidad: "",
        disponible: "",
    },
};

export function CocinaInventario({
    ingredientes,
}: {
    ingredientes: Ingrediente[];
}) {
    const [open, setOpen] = useState<boolean>(false);
    const [id, setId] = useState<string | number>("");
    const [nombre, setNombre] = useState<string>("");
    const [cantidad, setCantidad] = useState<number>(0);
    const [disponible, setDisponible] = useState<boolean>(true);

    const [state, formAction] = useFormState(addIngrediente, initialState);

    return (
        <div className="space-y-4">
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button>Agregar Ingrediente</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Agregar Nuevo Ingrediente</DialogTitle>
                    </DialogHeader>
                    <form
                        action={formAction}
                        className="space-y-4"
                        onSubmit={() => setOpen(false)}
                    >
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
                                onChange={(e) =>
                                    setCantidad(parseInt(e.target.value))
                                }
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
                        <Button type="submit">Agregar ingrediente</Button>
                    </form>
                </DialogContent>
            </Dialog>
            {state?.errors.nombre && (
                <p className="text-red-500">ERROR: {state?.errors.nombre}</p>
            )}

            <ul className="space-y-4">
                {ingredientes.map((ing) => (
                    <CocinaItem key={ing.id} ingrediente={ing} />
                ))}
            </ul>
        </div>
    );
}
