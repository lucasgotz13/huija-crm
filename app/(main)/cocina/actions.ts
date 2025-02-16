"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { z } from "zod";

const ingredienteSchema = z.object({
    nombre: z
        .string()
        .trim()
        .min(2, { message: "El campo 'nombre' requiere de dos o mas letras" }),
    cantidad: z.string().min(1, { message: "Este campo es requerido" }),
    disponible: z.boolean().optional(),
});

export async function addIngrediente(prevState: any, formData: FormData) {
    const supabase = await createClient();

    const ingrediente = {
        nombre: formData.get("nombre"),
        cantidad: formData.get("cantidad"),
        disponible: formData.get("disponible") ? true : false,
    };

    const ingredienteValidado = ingredienteSchema.safeParse(ingrediente);
    if (!ingredienteValidado.success) {
        const formFieldErrors = ingredienteValidado.error.flatten().fieldErrors;
        console.log(formFieldErrors);
        return {
            errors: {
                nombre: formFieldErrors?.nombre,
                cantidad: formFieldErrors?.cantidad,
                disponible: formFieldErrors?.disponible,
            },
        };
    }

    console.log("agregando", ingrediente);

    const { error } = await supabase.from("ingredientes").insert([ingrediente]);

    if (error) {
        return {
            errors: {
                nombre: "Error al agregar ingrediente",
                cantidad: "Error al agregar ingrediente",
                disponible: "Error al agregar ingrediente",
            },
        };
    }

    revalidatePath("/cocina", "page");
}

export async function updateIngrediente(formData: FormData) {
    const supabase = await createClient();

    const ingrediente = {
        id: formData.get("id"),
        nombre: formData.get("nombre"),
        cantidad: formData.get("cantidad"),
        disponible:
            formData.get("cantidad") === "0"
                ? false
                : formData.get("disponible")
                ? true
                : false,
    };

    console.log("editando", ingrediente);

    const { error } = await supabase
        .from("ingredientes")
        .update(ingrediente)
        .eq("id", ingrediente.id);

    if (error) {
        console.log(error);
        redirect("/error");
    }

    revalidatePath("/cocina", "page");
}

export async function deleteIngrediente(formData: FormData) {
    const supabase = await createClient();
    const ingrediente = {
        id: formData.get("id"),
    };
    console.log(ingrediente);

    const { error } = await supabase
        .from("ingredientes")
        .delete()
        .eq("id", ingrediente.id);

    if (error) {
        console.log(error);
        redirect("/error");
    }

    revalidatePath("/cocina", "page");
}
