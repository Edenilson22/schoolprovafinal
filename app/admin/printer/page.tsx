import { Button } from "@/components/ui/button";
import ListPrinter from "./List";


export default function Printer() {
    return (
        <div className="w-full flex flex-col  mt-6">
            <div className="flex justify-center mb-6">
                <a href="/admin/printer/new">
                    <Button>Cadastrar Impressora</Button>
                </a>
            </div>
            <ListPrinter/>
        </div>
    )
}