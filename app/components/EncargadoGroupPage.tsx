"use client";

import { useFormState, useFormStatus } from "react-dom";
import { Switch } from "./ui/switch";
import EncargadoItem from "./EncargadoItem";
import { PropiedadForm } from "./AddPropiedadForm";
import { addPropiedad } from "../(main)/encargado/actions";
import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import type { Propiedad } from "../types/types";

// type Propiedad = {
//     id: number;
//     tipo: string;
//     estado: boolean;
//     nombre: string;
//     group_id: number;
// };

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

export default function EncargadoGroupPage({
    propiedades,
    group_id,
}: {
    propiedades: Propiedad[];
    group_id: number;
}) {
    const [open, setOpen] = useState<boolean>(false);
    const [state, formAction] = useFormState(addPropiedad, initialState);
    return (
        <div className="space-y-2">
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button>Agregar propiedad</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Agregar propiedad</DialogTitle>
                    </DialogHeader>
                    <PropiedadForm
                        formAction={formAction}
                        isGrouped={true}
                        setOpen={setOpen}
                        group_id={group_id}
                    />
                </DialogContent>
            </Dialog>
            {propiedades.map((propiedad) => (
                <EncargadoItem
                    key={propiedad.id}
                    item={propiedad}
                    SubmitSwitch={SubmitSwitch}
                />
            ))}
        </div>
    );
}
