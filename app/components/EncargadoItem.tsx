"use client";

import { borrarPropiedad, updatePropiedad } from "../(main)/encargado/actions";
import DeleteButton from "./DeleteButton";
import { Label } from "./ui/label";

type Propiedad = {
    id: number;
    nombre: string;
    tipo: string;
    estado: boolean;
};

export default function EncargadoItem({
    item,
    SubmitSwitch,
}: {
    item: Propiedad;
    SubmitSwitch: any;
}) {
    return (
        <div className="flex items-center justify-between">
            <Label htmlFor={item.nombre} className="text-lg">
                {item.nombre}
            </Label>
            <div className="flex items-center gap-2">
                <DeleteButton id={item.id} action={borrarPropiedad} />
                <form
                    action={updatePropiedad}
                    className="flex items-center gap-2"
                >
                    <input type="hidden" name="id" value={item.id} />
                    <input type="hidden" name="tipo" value={item.tipo} />
                    <SubmitSwitch item={item} />
                </form>
            </div>
        </div>
    );
}
