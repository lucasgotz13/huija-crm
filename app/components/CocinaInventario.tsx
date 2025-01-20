"use client";

import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "./ui/dialog";
import { AddIngredienteForm } from "./AddIngredienteForm";
import { createClient } from "@/utils/supabase/client";

type Ingrediente = {
    id: number;
    nombre: string;
    cantidad: number;
    disponible: boolean;
};

export function CocinaInventario() {
    const [ingredientes, setIngredientes] = useState<Ingrediente[]>([]);

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
    }, []);

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
                {/* {ingredientes.map((ing) => (
                    <li key={ing.id} className="bg-white p-4 rounded-lg shadow">
                        {editingId === ing.id ? (
                            <div className="space-y-2">
                                <Input
                                    type="number"
                                    value={ing.cantidad}
                                    onChange={(e) =>
                                        handleSave(
                                            ing.id,
                                            parseInt(e.target.value),
                                            ing.disponible
                                        )
                                    }
                                />
                                <div className="flex items-center space-x-2">
                                    <Switch
                                        id={`disponible-${ing.id}`}
                                        checked={ing.disponible}
                                        onCheckedChange={(checked) =>
                                            handleSave(
                                                ing.id,
                                                ing.cantidad,
                                                checked
                                            )
                                        }
                                    />
                                    <Label htmlFor={`disponible-${ing.id}`}>
                                        Disponible
                                    </Label>
                                </div>
                                <Button onClick={() => setEditingId(null)}>
                                    Guardar
                                </Button>
                            </div>
                        ) : (
                            <div className="flex justify-between items-center">
                                <div>
                                    <h3 className="font-bold">{ing.nombre}</h3>
                                    <p>Cantidad: {ing.cantidad}</p>
                                    <p>
                                        Disponible:{" "}
                                        {ing.disponible ? "Sí" : "No"}
                                    </p>
                                </div>
                                <div className="space-x-2">
                                    <Button onClick={() => handleEdit(ing.id)}>
                                        Editar
                                    </Button>
                                    <Button
                                        onClick={() => handleDelete(ing.id)}
                                        variant="destructive"
                                    >
                                        Borrar
                                    </Button>
                                </div>
                            </div>
                        )}
                    </li>
                ))} */}
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
                            <div className="space-x-2">
                                {/* <Button onClick={() => handleEdit(ing.id)}>
                                    Editar
                                </Button> */}
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
                                <Button variant="destructive">Borrar</Button>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
