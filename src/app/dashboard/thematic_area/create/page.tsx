"use client"

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
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation'
import { ScrollArea } from "@/components/ui/scroll-area"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

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
  const router = useRouter()
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
       router.push('/dashboard/thematic_area')
      } else {
        console.error("Erro ao cadastrar o item");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
  }

  return (
  <>
      <ScrollArea className="w-full p-8">
        <div className="flex justify-between">
          <div className="flex">
            <h1 className="text-2xl font-semibold mb-4">Cadastrar Nova Área Temática</h1>
          </div>
          <div className="flex">
            <Link href="/dashboard/thematic_area">
              <Button variant="outline" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>   
          </div>
        </div>        
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 p-2">
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
      </ScrollArea>
    </>
  )
}