"use client";

import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "./ui/dialog";
import { AddIngredienteForm } from "./AddIngredienteForm";
import { createClient } from "@/utils/supabase/client";
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
import { deleteIngrediente } from "../(main)/cocina/actions";
import { useFormState } from "react-dom";

type Ingrediente = {
    id: number;
    nombre: string;
    cantidad: number;
    disponible: boolean;
};

export function CocinaInventario() {
    const [ingredientes, setIngredientes] = useState<Ingrediente[]>([]);
    const [state, deleteFormAction] = useFormState(
        deleteIngrediente,
        undefined
    );

    const supabase = createClient();

    useEffect(() => {
        const fetchIngredientes = async () => {
            const { data, error } = await supabase
                .from("ingredientes")
                .select("*");

            if (error) {
                console.error(error);
                return;
            }

            if (data) {
                setIngredientes(data.sort((a, b) => a.id - b.id));
                console.log(data);
            }
        };

        fetchIngredientes();
    }, [state]);

    return (
        <div className="space-y-4">
            <Dialog>
                <DialogTrigger asChild>
                    <Button>Agregar Ingrediente</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Agregar Nuevo Ingrediente</DialogTitle>
                    </DialogHeader>
                    <AddIngredienteForm accion="Agregar" ingrediente={null} />
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
                                            accion="Editar"
                                            ingrediente={ing}
                                        />
                                    </DialogContent>
                                </Dialog>
                                <AlertDialog>
                                    <AlertDialogTrigger>
                                        <Button variant="destructive">
                                            Borrar
                                        </Button>
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
                                            <form action={deleteFormAction}>
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
