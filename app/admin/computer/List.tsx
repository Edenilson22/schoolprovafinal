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
  
  
  interface IComputer {
    id:number,
    model:string,
    description:string
  }

  export default async function ListComputer() {
    const computers = await list()
    async function list(){
     revalidatePath("/admin/computer")
     const response = await fetch("http:servidorprovafinal.vercel.app/computers");
     return response.json();
    }
    async function deleteComputer(formData: FormData){
      "use server"
      const id = formData.get("id") as string;
      console.log(id)
    const response = await fetch("http:servidorprovafinal.vercel.app/computers/"+id, {
      method: 'DELETE',
    })
      revalidatePath("/admin/computer")
  }

    return (
      <Table>
        <TableCaption>Lista de Computadores</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Modelo</TableHead>
            <TableHead>Descrição</TableHead>
            <TableHead>Ação</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {computers.map((item:IComputer) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">{item.id}</TableCell>
              <TableCell>{item.model}</TableCell>
              <TableCell>{item.description}</TableCell>
              <TableCell>          <form >
                                     <input type="text" hidden name="id" value={item.id}/>   
                                    <Button variant= "destructive"
                                     formAction={deleteComputer}>Excluir</Button>
                                    </form>
                                    </TableCell>
            </TableRow>
          ))}
        </TableBody>
       
      </Table>
    )
  }
  