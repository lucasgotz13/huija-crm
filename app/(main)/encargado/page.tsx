import { EncargadoDashboard } from "../../components/EncargadoDashboard";
import { createClient } from "@/utils/supabase/server";

export default async function EncargadoPage() {
    const supabase = await createClient();
    const { data, error } = await supabase.from("propiedades").select("*");
    const sortedData = data?.sort((a, b) => a.id - b.id);
    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Dashboard del Encargado</h1>
            <EncargadoDashboard items={sortedData ?? []} />
        </div>
    );
}
