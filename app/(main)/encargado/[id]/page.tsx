import EncargadoGroupPage from "@/app/components/EncargadoGroupPage";
import { createClient } from "@/utils/supabase/server";

export default async function GrupoPage({
    params,
}: {
    params: { id: string };
}) {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from("grupo_propiedades")
        .select("*, propiedades(*)");
    if (!data) {
        console.error("Error:", error);
        return <div>No data found</div>;
    }
    const propiedades = data[0].propiedades;
    return (
        <div>
            <h1 className="mb-4 capitalize text-2xl font-bold ">{params.id}</h1>
            <EncargadoGroupPage
                propiedades={propiedades}
                group_id={data[0].id}
            />
        </div>
    );
}
