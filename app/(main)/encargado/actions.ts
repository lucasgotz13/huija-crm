"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function addPropiedad(formData: FormData) {
    const supabase = await createClient();

    const propiedad = {
        nombre: formData.get("nombre"),
        tipo: formData.get("tipo"),
        estado: formData.get("estado") ? true : false,
    };

    console.log(propiedad);

    const { error } = await supabase.from("propiedades").insert([propiedad]);

    if (error) {
        console.log(error);
        redirect("/error");
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
