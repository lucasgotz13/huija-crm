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
import { borrarPropiedad, updatePropiedad } from "../(main)/encargado/actions";
import { useFormStatus } from "react-dom";
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

type Propiedad = {
    id: number;
    nombre: string;
    tipo: string;
    estado: boolean;
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
                    <form
                        action={updatePropiedad}
                        className="flex items-center gap-2"
                    >
                        <input
                            type="hidden"
                            name="nombre"
                            value={item.nombre}
                        />
                        <input type="hidden" name="tipo" value={item.tipo} />
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
                                    <form action={borrarPropiedad}>
                                        <input
                                            type="hidden"
                                            name="id"
                                            value={item.id}
                                        />
                                        <AlertDialogAction type="submit">
                                            Borrar
                                        </AlertDialogAction>
                                    </form>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                        <SubmitSwitch item={item} />
                    </form>
                </div>
            ))}
        </div>
    );
}
