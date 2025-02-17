"use client";

import { cn } from "@/lib/utils";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { AddIngredienteForm } from "./AddIngredienteForm";
import { deleteIngrediente, updateIngrediente } from "../(main)/cocina/actions";
import DeleteButton from "./DeleteButton";
import type { Ingrediente } from "../types/types";

export default function CocinaItem({
    ingrediente,
}: {
    ingrediente: Ingrediente;
}) {
    return (
        <li
            className={cn(
                "bg-white border-2 p-4 rounded-lg shadow",
                !ingrediente.disponible && "border-red-500",
                ingrediente.cantidad == 0 && "border-red-500"
            )}
        >
            <div className="flex flex-col sm:flex-row justify-between items-center">
                <div>
                    <h3 className="font-bold">{ingrediente.nombre}</h3>
                    <p>Cantidad: {ingrediente.cantidad}</p>
                    <p>Disponible: {ingrediente.disponible ? "Sí" : "No"}</p>
                </div>
                <div className="space-x-4">
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button>Editar</Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Editar ingrediente</DialogTitle>
                            </DialogHeader>
                            <AddIngredienteForm
                                accion={updateIngrediente}
                                ingrediente={ingrediente}
                            />
                        </DialogContent>
                    </Dialog>
                    <DeleteButton
                        id={ingrediente.id}
                        action={deleteIngrediente}
                    />
                </div>
            </div>
        </li>
    );
}
