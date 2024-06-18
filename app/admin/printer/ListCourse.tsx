import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell, TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { revalidatePath } from "next/cache";
import { IPrinter } from "./List copy";



export default async function ListPrinter() {
  const printer = await list();
  async function list() {
    revalidatePath("/admin/printer");
    const response = await fetch("https://apiserver20241.vercel.app/printers");
    return response.json();
  }

  async function deletePrinter(formData: FormData) {
    "use server";
    const id = formData.get("id") as string;
    console.log(id);
    const response = await fetch("https://apiserver20241.vercel.app/printers/" + id, {
      method: 'DELETE',
    });
    revalidatePath("/admin/printer");
  }


  return (
    <Table>
      <TableCaption>Lista de Impressoras</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">ID</TableHead>
          <TableHead>Nome</TableHead>

          <TableHead>Ação</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {printer.map((item: IPrinter) => (
          <TableRow key={item.id}>
            <TableCell className="font-medium">{item.id}</TableCell>
            <TableCell>{item.name}</TableCell>

            <TableCell>
              <form>
                <input type="text" hidden name="id" value={item.id} />
                <Button variant="destructive"
                  formAction={deletePrinter}>Excluir</Button>
              </form>

            </TableCell>
          </TableRow>
        ))}
      </TableBody>

    </Table>
  );
}
