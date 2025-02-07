"use client";

import { useState } from "react";
import { Switch } from "./ui/switch";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { PropiedadForm } from "./AddPropiedadForm";
import { useFormState, useFormStatus } from "react-dom";
import EncargadoItem from "./EncargadoItem";
import { addPropiedad } from "../(main)/encargado/actions";

type Propiedad = {
    id: number;
    nombre: string;
    tipo: string;
    estado: boolean;
};

const initialState = {
    success: "",
    errors: {
        nombre: "",
        tipo: "",
        estado: "",
    },
};

function SubmitSwitch({ item }: { item: Propiedad }) {
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

export function EncargadoDashboard({ items }: { items: Propiedad[] }) {
    const [open, setOpen] = useState<boolean>(false);

    const [state, formAction] = useFormState(addPropiedad, initialState);

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
                    <PropiedadForm setOpen={setOpen} formAction={formAction} />
                </DialogContent>
            </Dialog>
            {state?.errors.nombre && (
                <p className="text-red-500">{state.errors.nombre}</p>
            )}
            {items.map((item) => (
                <EncargadoItem
                    key={item.id}
                    item={item}
                    SubmitSwitch={SubmitSwitch}
                />
            ))}
        </div>
    );
}
