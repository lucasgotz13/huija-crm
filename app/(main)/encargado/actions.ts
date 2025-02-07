"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { z } from "zod";

const propiedadSchema = z.object({
    nombre: z
        .string()
        .trim()
        .min(2, { message: "El campo 'nombre' requiere de dos o mas letras" }),
    tipo: z.enum(["switch", "select"], {
        errorMap: () => ({ message: "El tipo debe ser 'switch' o 'select'" }),
    }),
    estado: z.boolean().optional(),
});

export async function addPropiedad(prevState: any, formData: FormData) {
    const supabase = await createClient();

    const propiedad = {
        nombre: formData.get("nombre"),
        tipo: formData.get("tipo"),
        estado: formData.get("estado") ? true : false,
    };

    const propiedadValidada = propiedadSchema.safeParse(propiedad);
    if (!propiedadValidada.success) {
        const formFieldErrors = propiedadValidada.error.flatten().fieldErrors;
        console.log(formFieldErrors);
        return {
            errors: {
                nombre: formFieldErrors?.nombre,
                tipo: formFieldErrors?.tipo,
                estado: formFieldErrors?.estado,
            },
        };
    }

    console.log(propiedad);

    const { error } = await supabase.from("propiedades").insert([propiedad]);

    if (error) {
        console.log(error);
        return {
            errors: {
                nombre: "Error al agregar propiedad",
                tipo: "Error al agregar propiedad",
                estado: "Error al agregar propiedad",
            },
        };
    }

    revalidatePath("/", "layout");
}

export async function updatePropiedad(formData: FormData) {
    const supabase = await createClient();

    const propiedad = {
        id: formData.get("id"),
        tipo: formData.get("tipo"),
        estado: formData.get("estado") ? false : true,
    };

    console.log(propiedad);

    const { error } = await supabase
        .from("propiedades")
        .update(propiedad)
        .eq("id", propiedad.id);

    if (error) {
        console.log(error);
        redirect("/error");
    }

    revalidatePath("/", "layout");
}

export async function borrarPropiedad(formData: FormData) {
    const supabase = await createClient();

    const propiedad = {
        id: formData.get("id"),
    };

    console.log(propiedad);

    const { error } = await supabase
        .from("propiedades")
        .delete()
        .eq("id", propiedad.id);

    if (error) {
        console.log(error);
        redirect("/error");
    }

    revalidatePath("/", "layout");
}
