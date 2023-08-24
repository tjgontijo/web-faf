"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useForm } from "react-hook-form"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const formSchema = z.object(
  {
    typeItem: z.string().min(1, {
      message: "Informe um Item válido"
    })
  }
)

export default function Types() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      typeItem: "",
    }
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await fetch("http://localhost:3333/type", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
    } catch (error) {
      form.reset()
      console.error("Erro na requisição:", error);
    }
  }

  const [typeItem, setTypeItem] = useState<string[]>([]);

  async function fetchThematicAreas() {
    try {
      const response = await fetch("http://localhost:3333/thematic_area");
      const data = await response.json();
      setTypeItem(data);
    } catch (error) {
      console.error("Erro ao buscar áreas temáticas:", error);
    }
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-96">
          <FormField
            control={form.control}
            name="typeItem"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tipo de Item</FormLabel>
                <FormControl>
                  <Input placeholder="Qual Tipo de Item deseja cadastrar?" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button variant="outline" type="submit">Cadastrar</Button>
        </form>
      </Form>
      <div className="pt-8">
        <Table>
          <TableCaption>Lista de Tipos de Itens</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Tipo de Item</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {typeItem.map((typeItem, index) => (
              <TableRow key={index}>
                <TableCell>{typeItem}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  )
}