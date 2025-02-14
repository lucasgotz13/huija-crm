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
        return <div>No data found</div>;
    }
    const propiedades = data[0].propiedades;
    // console.log(propiedades);
    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">{params.id}</h1>
            <EncargadoGroupPage
                propiedades={propiedades}
                group_id={data[0].id}
            />
        </div>
    );
}
