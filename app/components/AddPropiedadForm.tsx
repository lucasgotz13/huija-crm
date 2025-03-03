"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export function PropiedadForm({
    setOpen,
    formAction,
    isGrouped,
    group_id = null,
}: {
    setOpen: (open: boolean) => void;
    formAction: any;
    isGrouped: boolean;
    group_id?: number | string | null;
}) {
    const [nombre, setNombre] = useState<string>("");
    const [estado, setEstado] = useState<boolean>(true);
    const [tipo, setTipo] = useState<string>("");

    return (
        <form
            action={formAction}
            onSubmit={() => setOpen(false)}
            className="space-y-4"
        >
            <div className="space-y-2">
                <Label htmlFor="nombre">Nombre</Label>
                <Input
                    id="nombre"
                    value={nombre}
                    name="nombre"
                    onChange={(e) => setNombre(e.target.value)}
                    required
                />
            </div>
            {!isGrouped ? (
                <div className="space-y-2">
                    <Select
                        name="tipo"
                        value={tipo}
                        onValueChange={setTipo}
                        required
                    >
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Selecciona un tipo" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Tipo</SelectLabel>
                                <SelectItem value="switch">Switch</SelectItem>
                                <SelectItem value="grupo">Grupo</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            ) : (
                <>
                    <input
                        type="hidden"
                        name="tipo"
                        value="switch"
                        defaultValue="switch"
                    />
                    <input
                        type="hidden"
                        name="group_id"
                        value={group_id?.toString()}
                    />
                </>
            )}
            <div className="flex items-center space-x-2">
                <Switch
                    id="estado"
                    name="estado"
                    checked={estado}
                    onCheckedChange={setEstado}
                />
                <Label htmlFor="estado">Disponible</Label>
            </div>
            <Button type="submit">Agregar Propiedad</Button>
        </form>
    );
}
