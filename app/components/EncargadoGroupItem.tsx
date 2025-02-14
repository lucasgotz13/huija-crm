import Link from "next/link";
import {
    borrarGrupoPropiedades,
    updatePropiedad,
} from "../(main)/encargado/actions";
import DeleteButton from "./DeleteButton";
import { Label } from "./ui/label";
import { Button } from "./ui/button";

type PropiedadGrupo = {
    id: number;
    nombre: string;
};

export default function EncargadoGroupItem({ item }: { item: PropiedadGrupo }) {
    return (
        <div className="bg-white border-2 p-4 rounded-lg shadow flex items-center justify-between">
            <Label htmlFor={item.nombre} className="text-lg">
                {item.nombre}
            </Label>
            <div className="flex items-center gap-2">
                <DeleteButton id={item.id} action={borrarGrupoPropiedades} />
                <Link href={`/encargado/${item.nombre}`}>
                    <Button>Ver mas</Button>
                </Link>
            </div>
        </div>
    );
}
