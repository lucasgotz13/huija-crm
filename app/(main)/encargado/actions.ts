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
    redirect("/");
}
