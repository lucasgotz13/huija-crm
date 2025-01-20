"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

import { z } from "zod";

const loginSchema = z.object({
    email: z.string().trim().min(2, { message: "Este campo es requerido" }),
    password: z.string().min(8, {
        message: "La contraseña tiene que ser mínimo de 8 carácteres",
    }),
});

export async function login(prevState: any, formData: FormData) {
    const supabase = await createClient();

    // type-casting here for convenience
    // in practice, you should validate your inputs
    const data = {
        email: formData.get("email") as string,
        password: formData.get("password") as string,
    };
    const validatedData = loginSchema.safeParse(data);
    if (!validatedData.success) {
        const formFieldErrors = validatedData.error.flatten().fieldErrors;
        console.log(formFieldErrors);
        return {
            errors: {
                email: formFieldErrors?.email,
                password: formFieldErrors?.password,
            },
        };
    }
    console.log(data);
    data.email = `${data.email}@huija.com`;

    const { error } = await supabase.auth.signInWithPassword(data);

    if (error) {
        // redirect("/error");
        return {
            errors: {
                email: "Credenciales inválidas",
                password: "Credenciales inválidas",
            },
        };
    }

    revalidatePath("/", "layout");
    redirect("/");
}
