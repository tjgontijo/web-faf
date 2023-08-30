"use client"

import { useEffect, useState } from "react"
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
        fetchThematicAreas();
      } else {
        console.error("Erro ao cadastrar o item");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
  }

  interface ThematicArea {
    id: string;
    short_name: string;
    name: string;
    created_at: string;
  }

  const [thematicAreas, setThematicAreas] = useState<ThematicArea[]>([]);


  async function fetchThematicAreas() {
    try {
      const response = await fetch("http://localhost:3333/thematic_area", {
         cache: 'force-cache' });
      const data = await response.json();
      console.log("Dados da API:", data); // Adicione esta linha

      if (Array.isArray(data.thematicArea)) {
        setThematicAreas(data.thematicArea);
      } else {
        console.error("Erro ao buscar áreas temáticas.");
      }
    } catch (error) {
      console.error("Erro ao buscar áreas temáticas:", error);
    }
  }
  useEffect(() => {
    fetchThematicAreas();
  }, []);

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
      <div className="pt-8 overflow-y-auto">

        <Table>
          <TableCaption>Lista de Áreas Temáticas</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Sigla</TableHead>
              <TableHead>Nome</TableHead>
              <TableHead>Criado em</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {thematicAreas.map((thematicArea) => (
              <TableRow key={thematicArea.id}>
                <TableCell>{thematicArea.short_name}</TableCell>
                <TableCell>{thematicArea.name}</TableCell>
                <TableCell>{thematicArea.created_at}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

      </div>
    </>
  )
}