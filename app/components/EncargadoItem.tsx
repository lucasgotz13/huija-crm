"use client";

import {
    borrarGrupoPropiedades,
    borrarPropiedad,
    sacarPropiedadGrupo,
    updatePropiedad,
} from "../(main)/encargado/actions";
import DeleteButton from "./DeleteButton";
import { Label } from "./ui/label";
import type { Propiedad, PropiedadGrupo } from "../types/types";
import Link from "next/link";
import { Button } from "./ui/button";

export default function EncargadoItem({
    item,
    SubmitSwitch = null,
    isGroupPage,
    isGrouped = false,
}: {
    item: Propiedad | PropiedadGrupo;
    SubmitSwitch?: any;
    isGroupPage: boolean;
    isGrouped?: boolean;
}) {
    return (
        <div className="bg-white border-2 p-4 rounded-lg shadow flex flex-wrap items-center justify-between">
            <Label htmlFor={item.nombre} className="text-lg">
                {item.nombre}
            </Label>
            <div className="flex flex-wrap items-center gap-2">
                {!isGroupPage ? (
                    <>
                        {isGrouped && (
                            <form
                                action={sacarPropiedadGrupo}
                                className="flex items-center gap-2"
                            >
                                <input
                                    type="hidden"
                                    name="id"
                                    value={item.id}
                                />
                                <Button type="submit">Sacar del grupo</Button>
                            </form>
                        )}
                        <DeleteButton id={item.id} action={borrarPropiedad} />
                        <form
                            action={updatePropiedad}
                            className="flex items-center gap-2"
                        >
                            <input type="hidden" name="id" value={item.id} />
                            <input
                                type="hidden"
                                name="tipo"
                                value={item.tipo}
                            />
                            <SubmitSwitch item={item} />
                        </form>
                    </>
                ) : (
                    <>
                        <DeleteButton
                            id={item.id}
                            action={borrarGrupoPropiedades}
                        />
                        <Link href={`/encargado/${item.nombre}`}>
                            <Button>Ver mas</Button>
                        </Link>
                    </>
                )}
            </div>
        </div>
    );
}
