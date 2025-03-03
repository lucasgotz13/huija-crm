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
    tipo: z.enum(["switch", "grupo"], {
        errorMap: () => ({ message: "El tipo debe ser 'switch' o 'grupo'" }),
    }),
    estado: z.boolean().nullable().optional(),
});

export async function addPropiedad(prevState: any, formData: FormData) {
    const supabase = await createClient();

    const tipo = formData.get("tipo") || "switch"; // Valor por defecto

    const propiedad = {
        nombre: formData.get("nombre"),
        tipo: tipo,
        estado: tipo === "grupo" ? null : formData.get("estado") === "on",
        group_id: formData.get("group_id") ?? null,
    };

    console.log(propiedad);

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

    if (propiedad.tipo === "grupo") {
        const grupo = {
            nombre: propiedad.nombre,
        };
        const { error } = await supabase
            .from("grupo_propiedades")
            .insert([grupo]);
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
    } else {
        const { error } = await supabase
            .from("propiedades")
            .insert([propiedad]);

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

export async function sacarPropiedadGrupo(formData: FormData) {
    const supabase = await createClient();

    const propiedad = {
        id: formData.get("id"),
        group_id: null,
    };

    const { error } = await supabase
        .from("propiedades")
        .update(propiedad)
        .eq("id", propiedad.id);

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

export async function borrarGrupoPropiedades(formData: FormData) {
    const supabase = await createClient();

    const propiedad = {
        id: formData.get("id"),
    };

    // Primero eliminar todas las propiedades del grupo
    const { error: deletePropiedadesError } = await supabase
        .from("propiedades")
        .delete()
        .eq("group_id", propiedad.id);

    if (deletePropiedadesError) {
        console.log(deletePropiedadesError);
        redirect("/error");
    }

    // Luego eliminar el grupo
    const { error: deleteGrupoError } = await supabase
        .from("grupo_propiedades")
        .delete()
        .eq("id", propiedad.id);

    if (deleteGrupoError) {
        console.log(deleteGrupoError);
        redirect("/error");
    }

    revalidatePath("/", "layout");
}
