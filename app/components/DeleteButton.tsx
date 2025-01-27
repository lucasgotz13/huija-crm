"use client";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "./ui/alert-dialog";

export default function DeleteButton({
    id,
    action,
}: {
    id: number;
    action: any;
}) {
    return (
        <AlertDialog>
            <AlertDialogTrigger className="px-4 py-2 rounded-md bg-red-500 hover:bg-red-500/90 text-white">
                Borrar
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Estas seguro?</AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <form action={action}>
                        <input type="hidden" name="id" value={id} />
                        <AlertDialogAction type="submit">
                            Borrar
                        </AlertDialogAction>
                    </form>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
