import { CocinaInventario } from "../../components/CocinaInventario";
import { createClient } from "@/utils/supabase/server";

export default async function CocinaPage() {
    const supabase = await createClient();
    const { data, error } = await supabase.from("ingredientes").select("*");
    const sortedData = data?.sort((a, b) => a.id - b.id);
    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Inventario de Cocina</h1>
            <CocinaInventario ingredientes={sortedData ?? []} />
        </div>
    );
}
