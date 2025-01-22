import { CocinaInventario } from "../../components/CocinaInventario";

export default async function CocinaPage() {
    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Inventario de Cocina</h1>
            <CocinaInventario />
        </div>
    );
}
