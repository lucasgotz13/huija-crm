"use client";

import Link from "next/link";
import { Home, ChefHat, Clipboard, MoveLeft } from "lucide-react";
import { Button } from "./ui/button";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

export function Sidebar() {
    const router = useRouter();
    const supabase = createClient();
    function logout() {
        supabase.auth.signOut();
        router.push("/login");
    }
    return (
        <div className="bg-white w-16 md:w-64 flex flex-col items-center md:items-start py-4 border-r h-full">
            <div className="flex-1 w-full">
                <Link href="/" className="w-full">
                    <Button
                        variant="ghost"
                        size="lg"
                        className="w-full justify-start mb-4"
                    >
                        <Home className="h-6 w-6 md:mr-2" />
                        <span className="hidden md:inline">Inicio</span>
                    </Button>
                </Link>
                <Link href="/encargado" className="w-full">
                    <Button
                        variant="ghost"
                        size="lg"
                        className="w-full justify-start mb-4"
                    >
                        <Clipboard className="h-6 w-6 md:mr-2" />
                        <span className="hidden md:inline">Encargado</span>
                    </Button>
                </Link>
                <Link href="/cocina" className="w-full">
                    <Button
                        variant="ghost"
                        size="lg"
                        className="w-full justify-start"
                    >
                        <ChefHat className="h-6 w-6 md:mr-2" />
                        <span className="hidden md:inline">Cocina</span>
                    </Button>
                </Link>
            </div>
            <div className="w-full mt-auto">
                <Button
                    variant="ghost"
                    size="lg"
                    className="w-full justify-start"
                    onClick={logout}
                >
                    <MoveLeft className="h-6 w-6 md:mr-2" />
                    <span className="hidden md:inline">Salir</span>
                </Button>
            </div>
        </div>
    );
}
