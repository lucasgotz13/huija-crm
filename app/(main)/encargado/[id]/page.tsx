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
    const grupo = data.find((grupo) => grupo.nombre === params.id);
    const propiedades = grupo?.propiedades;
    const sortedPropiedades = propiedades.sort((a, b) => a.id - b.id);
    return (
        <div>
            <h1 className="mb-4 capitalize text-2xl font-bold ">{params.id}</h1>
            <EncargadoGroupPage
                propiedades={sortedPropiedades}
                group_id={grupo?.id}
            />
        </div>
    );
}
