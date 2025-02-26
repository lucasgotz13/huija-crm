import EncargadoGroupPage from "@/app/components/EncargadoGroupPage";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/server";
import { MoveLeft } from "lucide-react";
import Link from "next/link";

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
            <Link href={"/encargado"}>
                <Button variant="outline">
                    <MoveLeft className="h-6 w-6 md:mr-2" />
                    <span className="hidden md:inline">Volver</span>
                </Button>
            </Link>
            <h1 className="mb-4 capitalize text-2xl font-bold ">{params.id}</h1>
            <EncargadoGroupPage
                propiedades={sortedPropiedades}
                group_id={grupo?.id}
            />
        </div>
    );
}
