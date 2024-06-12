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


interface IStudent {
  id: number,
  name: string,
  email: string
}

export default async function ListStudent() {
  const students = await list()
  async function list() {
    revalidatePath("/admin/student")
    const response = await fetch("https://apiserver20241.vercel.app/students");
    return response.json();
  }

  async function deleteStudent(formData: FormData) {
    "use server"
    const id = formData.get("id") as string;
    console.log(id)
    const response = await fetch("https://apiserver20241.vercel.app/students/" + id, {
      method: 'DELETE',
    })
    revalidatePath("/admin/student")
  }


  return (
    <Table>
      <TableCaption>Lista de Estudantes</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">ID</TableHead>
          <TableHead>Nome</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Ação</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {students.map((item: IStudent) => (
          <TableRow key={item.id}>
            <TableCell className="font-medium">{item.id}</TableCell>
            <TableCell>{item.name}</TableCell>
            <TableCell>{item.email}</TableCell>
            <TableCell>
              <form >
                <input type="text" hidden name="id" value={item.id} />
                <Button variant="destructive"
                  formAction={deleteStudent}>Excluir</Button>
              </form>

            </TableCell>
          </TableRow>
        ))}
      </TableBody>

    </Table>
  )
}
