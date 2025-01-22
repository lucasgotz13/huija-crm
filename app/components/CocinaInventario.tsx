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
import { AddIngredienteForm } from "./AddIngredienteForm";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "./ui/alert-dialog";
import {
    addIngrediente,
    deleteIngrediente,
    updateIngrediente,
} from "../(main)/cocina/actions";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";

type Ingrediente = {
    id: number;
    nombre: string;
    cantidad: number;
    disponible: boolean;
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
                        action={addIngrediente}
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

            <ul className="space-y-4">
                {ingredientes.map((ing) => (
                    <li key={ing.id} className="bg-white p-4 rounded-lg shadow">
                        <div className="flex justify-between items-center">
                            <div>
                                <h3 className="font-bold">{ing.nombre}</h3>
                                <p>Cantidad: {ing.cantidad}</p>
                                <p>
                                    Disponible: {ing.disponible ? "Sí" : "No"}
                                </p>
                            </div>
                            <div className="space-x-4">
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button>Editar</Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>
                                                Editar ingrediente
                                            </DialogTitle>
                                        </DialogHeader>
                                        <AddIngredienteForm
                                            accion={updateIngrediente}
                                            ingrediente={ing}
                                        />
                                    </DialogContent>
                                </Dialog>
                                {/* TODO: Quizás hacerlo un componente reutilizable */}
                                <AlertDialog>
                                    <AlertDialogTrigger className="px-4 py-2 rounded-md bg-red-500 hover:bg-red-500/90 text-white">
                                        Borrar
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>
                                                Estas seguro?
                                            </AlertDialogTitle>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>
                                                Cancelar
                                            </AlertDialogCancel>
                                            <form action={deleteIngrediente}>
                                                <input
                                                    type="hidden"
                                                    name="id"
                                                    value={ing.id}
                                                />
                                                <AlertDialogAction type="submit">
                                                    Borrar
                                                </AlertDialogAction>
                                            </form>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
