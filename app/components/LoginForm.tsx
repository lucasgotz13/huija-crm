"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { login } from "../(auth)/login/actions";
import { useFormStatus } from "react-dom";

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button className="w-full" type="submit" disabled={pending}>
            {pending ? "Cargando..." : "Iniciar Sesión"}
        </Button>
    );
}

export function LoginForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    return (
        <Card className="w-[350px]">
            <CardHeader>
                <CardTitle>Iniciar Sesión</CardTitle>
            </CardHeader>
            <CardContent>
                <form className="space-y-4" action={login}>
                    <div className="space-y-2">
                        <Label htmlFor="email">Usuario</Label>
                        <Input
                            id="email"
                            type="text"
                            name="email"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password">Contraseña</Label>
                        <Input
                            id="password"
                            type="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <SubmitButton />
                </form>
            </CardContent>
        </Card>
    );
}
