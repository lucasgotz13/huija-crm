"use client";

import { useState } from "react";
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

type Ingrediente = {
    id: number;
    nombre: string;
    cantidad: number;
    disponible: boolean;
};

export function CocinaInventario() {
    const [ingredientes, setIngredientes] = useState<Ingrediente[]>([
        { id: 1, nombre: "Tomates", cantidad: 10, disponible: true },
        { id: 2, nombre: "Lechuga", cantidad: 5, disponible: true },
        { id: 3, nombre: "Carne", cantidad: 20, disponible: false },
    ]);

    const [editingId, setEditingId] = useState<number | null>(null);

    const handleEdit = (id: number) => {
        setEditingId(id);
    };

    const handleSave = (
        id: number,
        newCantidad: number,
        newDisponible: boolean
    ) => {
        setIngredientes(
            ingredientes.map((ing) =>
                ing.id === id
                    ? {
                          ...ing,
                          cantidad: newCantidad,
                          disponible: newDisponible,
                      }
                    : ing
            )
        );
        setEditingId(null);
    };

    const handleAddIngrediente = (
        nuevoIngrediente: Omit<Ingrediente, "id">
    ) => {
        setIngredientes([
            ...ingredientes,
            { ...nuevoIngrediente, id: Date.now() },
        ]);
    };

    const handleDelete = (id: number) => {
        setIngredientes(ingredientes.filter((ing) => ing.id !== id));
    };

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
                    <AddIngredienteForm onAdd={handleAddIngrediente} />
                </DialogContent>
            </Dialog>

            <ul className="space-y-4">
                {ingredientes.map((ing) => (
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
                ))}
            </ul>
        </div>
    );
}
