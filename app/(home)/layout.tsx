import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { Sidebar } from "../components/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Restaurant CRM",
    description: "CRM para gestión de restaurante",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        // <html lang="es">
        //     <body className={inter.className}>
        <div className="flex h-screen bg-gray-100">
            <Sidebar />
            <main className="flex-1 overflow-y-auto p-4">{children}</main>
        </div>
        //     </body>
        // </html>
    );
}
