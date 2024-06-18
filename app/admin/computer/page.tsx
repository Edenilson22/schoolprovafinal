import { Button } from "@/components/ui/button";
import ListComputer from "./List";


export default function Computer() {
    return (
        <div className="w-full flex flex-col  mt-6">
            <div className="flex justify-center mb-6">
                <a href="/admin/computer/new">
                    <Button>Cadastrar Computador</Button>
                </a>
            </div>
            <ListComputer />
        </div>
    )
}