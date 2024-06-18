"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"


const FormSchema = z.object({
    model: z.string().min(2, {
        message: "Nome precisa ter no mínimo 2 characteres."
    }),
    description: z.string({ message: "Digite a descrição correta" }),
})

export default function SaveComputer() {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            model: "Modelo 01",
            description: "Computador i5 8gb"
        },
    })

    async function onSubmit(computer: z.infer<typeof FormSchema>) {
        const requestOption = {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(computer)
        }
      const response = await fetch("https://servidorprovafinal.vercel.app/computers/", requestOption)
      form.reset();
      alert("Computador Cadastrado com Sucesso!")

    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
                <FormField
                    control={form.control}
                    name="model"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Modelo</FormLabel>
                            <FormControl>
                                <Input placeholder="Digite o modelo do computador" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Descrição:</FormLabel>
                            <FormControl>
                                <Input placeholder="Digite a descrição do computador" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit">Submit</Button>
            </form>
        </Form>
    )
}
