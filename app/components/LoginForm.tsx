"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { login } from "../(auth)/login/actions";
import { useFormState, useFormStatus } from "react-dom";

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button className="w-full" type="submit" disabled={pending}>
            {pending ? "Cargando..." : "Iniciar Sesión"}
        </Button>
    );
}

const initialState = {
    success: "",
    errors: {
        email: "",
        password: "",
    },
};

export function LoginForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [state, formAction] = useFormState(login, initialState);

    return (
        <Card className="w-[350px]">
            <CardHeader>
                <CardTitle>Iniciar Sesión</CardTitle>
            </CardHeader>
            <CardContent>
                <form className="space-y-4" action={formAction}>
                    <div className="space-y-2">
                        <Label htmlFor="email">Usuario</Label>
                        <Input
                            id="email"
                            type="text"
                            name="email"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        {state.errors?.email && (
                            <p className="text-red-500 text-xs">
                                {state.errors.email}
                            </p>
                        )}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password">Contraseña</Label>
                        <Input
                            id="password"
                            type="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {state.errors?.password && (
                            <p className="text-red-500 text-xs">
                                {state.errors.password}
                            </p>
                        )}
                    </div>
                    <SubmitButton />
                </form>
            </CardContent>
        </Card>
    );
}
