import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { revalidatePath } from "next/cache";
  
  
  interface IPrinter {
    id:number,
    name:string,
   
  }

  export default async function ListPrinter() {
    const printers = await list()
    async function list(){
     revalidatePath("/admin/printer")
     const response = await fetch("http:servidorprovafinal.vercel.app/printers");
     return response.json();
    }
    async function deletePrinter(formData: FormData){
      "use server"
      const id = formData.get("id") as string;
      console.log(id)
    const response = await fetch("http:servidorprovafinal.vercel.app/printers/"+id, {
      method: 'DELETE',
    })
      revalidatePath("/admin/printer")
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
          {printers.map((item:IPrinter) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">{item.id}</TableCell>
              <TableCell>{item.name}</TableCell>
            
              <TableCell>          <form >
                                     <input type="text" hidden name="id" value={item.id}/>   
                                    <Button variant= "destructive"
                                     formAction={deletePrinter}>Excluir</Button>
                                    </form>
                                    </TableCell>
            </TableRow>
          ))}
        </TableBody>
       
      </Table>
    )
  }
  