"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function addIngrediente(formData: FormData) {
    const supabase = await createClient();

    const ingrediente = {
        nombre: formData.get("nombre"),
        cantidad: formData.get("cantidad"),
        disponible: formData.get("disponible") ? true : false,
    };

    console.log("agregando", ingrediente);

    const { error } = await supabase.from("ingredientes").insert([ingrediente]);

    if (error) {
        console.log(error);
        redirect("/error");
    }

    revalidatePath("/cocina", "page");
    redirect("/cocina");
}

export async function updateIngrediente(formData: FormData) {
    const supabase = await createClient();

    const ingrediente = {
        id: formData.get("id"),
        nombre: formData.get("nombre"),
        cantidad: formData.get("cantidad"),
        disponible: formData.get("disponible") ? true : false,
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

    revalidatePath("/", "page");
    return {
        success: true,
    };
}

export async function deleteIngrediente(prevState: any, formData: FormData) {
    const supabase = await createClient();
    // const router = useRouter();
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

    revalidatePath("/cocina");
    return {
        success: true,
    };
}
