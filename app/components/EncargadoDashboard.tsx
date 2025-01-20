"use client";

import { useEffect, useState } from "react";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { PropiedadForm } from "./AddPropiedadForm";
import { createClient } from "@/utils/supabase/client";

type Propiedades = {
    nombre: string;
    tipo: string;
    estado: boolean;
};

export function EncargadoDashboard() {
    const supabase = createClient();
    const [items, setItems] = useState<Propiedades[]>([]);

    const toggleEstado = async (nombre: string) => {
        const { data, error } = await supabase
            .from("propiedades")
            .update({
                estado: !items.find((item) => item.nombre === nombre)?.estado,
            })
            .eq("nombre", nombre);
        if (error) {
            console.log(error);
            return;
        }
        setItems(
            items.map((item) =>
                item.nombre === nombre
                    ? { ...item, estado: !item.estado }
                    : item
            )
        );
    };
    useEffect(() => {
        const fetchItems = async () => {
            const { data, error } = await supabase.from("propiedades").select();
            if (error) {
                console.log(error);
            }
            console.log(data);
            const sortedData = data?.sort((a, b) => a.id - b.id) ?? [];
            setItems(sortedData);
        };
        fetchItems();
    }, []);

    return (
        <div className="space-y-4">
            <Dialog>
                <DialogTrigger asChild>
                    <Button>Agregar propiedad</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Agregar propiedad</DialogTitle>
                    </DialogHeader>
                    <PropiedadForm />
                </DialogContent>
            </Dialog>
            {items.map((item) => (
                <div
                    key={item.nombre}
                    className="flex items-center justify-between"
                >
                    <Label htmlFor={item.nombre} className="text-lg">
                        {item.nombre}
                    </Label>
                    <Switch
                        id={item.nombre}
                        checked={item.estado}
                        onCheckedChange={() => toggleEstado(item.nombre)}
                    />
                </div>
            ))}
        </div>
    );
}
