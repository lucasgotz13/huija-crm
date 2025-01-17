import { EncargadoDashboard } from "../../components/EncargadoDashboard";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function EncargadoPage() {
    const supabase = await createClient();

    const { data, error } = await supabase.auth.getUser();
    if (error || !data?.user) {
        redirect("/login");
    }
    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Dashboard del Encargado</h1>
            <EncargadoDashboard />
        </div>
    );
}
