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
    short_name: z.string().min(1, {
      message: "Informe uma Sigla válida",
    }),
    name: z.string().min(1, {
      message: "Informe uma Área Temática válida"
    }),
  }
)

export default function Types() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      short_name: "",
      name: "",
    }
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await fetch("http://localhost:3333/thematic_area", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        form.reset()
        console.log("Item cadastrado com sucesso!");
      } else {
        form.reset()
        console.error("Erro ao cadastrar o item");
      }
    } catch (error) {
      form.reset()
      console.error("Erro na requisição:", error);
    }
  }

  const [thematicAreas, setThematicAreas] = useState<string[]>([]);

  async function fetchThematicAreas() {
    try {
      const response = await fetch("http://localhost:3333/thematic_area");
      const data = await response.json();
      setThematicAreas(data);
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
            name="short_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sigla</FormLabel>
                <FormControl>
                  <Input placeholder="Qual a Sigla?" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Área Temática</FormLabel>
                <FormControl>
                  <Input placeholder="Qual Área Temática deseja cadastrar?" {...field} />
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
          <TableCaption>Lista de Áreas Temáticas</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Área Temática</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {thematicAreas.map((thematicArea, index) => (
              <TableRow key={index}>
                <TableCell>{thematicArea}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  )
}