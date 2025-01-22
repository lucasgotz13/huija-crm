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
import { updatePropiedad } from "../(main)/encargado/actions";
import { useFormStatus } from "react-dom";

type Propiedades = {
    nombre: string;
    tipo: string;
    estado: boolean;
};

function SubmitSwitch({ item }: { item: Propiedades }) {
    const { pending } = useFormStatus();
    return (
        <Switch
            id={item.nombre}
            name="estado"
            checked={item.estado}
            type="submit"
            disabled={pending}
        />
    );
}

export function EncargadoDashboard({ items }: { items: Propiedades[] }) {
    const [open, setOpen] = useState<boolean>(false);

    return (
        <div className="space-y-4">
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button>Agregar propiedad</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Agregar propiedad</DialogTitle>
                    </DialogHeader>
                    <PropiedadForm setOpen={setOpen} />
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
                    <form action={updatePropiedad}>
                        <input
                            type="hidden"
                            name="nombre"
                            value={item.nombre}
                        />
                        <input type="hidden" name="tipo" value={item.tipo} />
                        {/* <Switch
                            id={item.nombre}
                            name="estado"
                            checked={item.estado}
                            type="submit"
                        /> */}
                        <SubmitSwitch item={item} />
                    </form>
                </div>
            ))}
        </div>
    );
}
