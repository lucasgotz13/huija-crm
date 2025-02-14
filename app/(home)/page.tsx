import Link from "next/link";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "../components/ui/card";
import { ChefHat, Clipboard } from "lucide-react";
import { WeatherWidget } from "../components/WeatherWidget";

export default async function HomePage() {
    return (
        <div className="space-y-4">
            <h1 className="text-2xl font-bold">
                Bienvenido al CRM del Restaurante
            </h1>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <Link href="/encargado">
                    <Card className="hover:bg-gray-50 transition-colors cursor-pointer">
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <Clipboard className="mr-2 h-6 w-6" />
                                Encargado
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>Gestionar estado del restaurante</p>
                        </CardContent>
                    </Card>
                </Link>
                <Link href="/cocina">
                    <Card className="hover:bg-gray-50 transition-colors cursor-pointer">
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <ChefHat className="mr-2 h-6 w-6" />
                                Cocina
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>Gestionar inventario de ingredientes</p>
                        </CardContent>
                    </Card>
                </Link>
            </div>
            <WeatherWidget />
        </div>
    );
}
