import { createClient } from "@/utils/supabase/server";

export default async function GrupoPage({
    params,
}: {
    params: { id: string };
}) {
    const supabase = await createClient();
    return (
        <div>
            <h1>{params.id}</h1>
        </div>
    );
}
