"use client"
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation'
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  thematicAreaId: z.string(), 
  short_name: z.string().min(1, {
    message: "Informe uma Sigla válida",
  }),
  name: z.string().min(1, {
    message: "Informe uma Ação válida",
  }),
  description: z.string(), 
});

export default function Types() {
  const router = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      thematicAreaId: "", 
      short_name: "",
      name: "",
      description: "", 
    },
  });

  interface ThematicArea {
    id: string;
    name: string;
  }

  const [thematicAreas, setThematicAreas] = useState<ThematicArea[]>([]);

  useEffect(() => {
    async function fetchThematicAreas() {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/thematic_area`);
        const data = await response.json();
        if (Array.isArray(data.thematicArea)) {
          setThematicAreas(data.thematicArea);
        } else {
          console.error("Erro ao buscar áreas temáticas.");
        }
      } catch (error) {
        console.error("Erro ao buscar áreas temáticas:", error);
      }
    }
    fetchThematicAreas();
  }, []);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await fetch("http://localhost:3333/actions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      if (response.ok) {
        router.push("/dashboard/action");
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
            <h1 className="text-2xl font-semibold mb-4">Cadastrar Nova Ação</h1>
          </div>
          <div className="flex">
            <Link href="/dashboard/action">
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
              name="thematicAreaId" 
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Área Temática</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent style={{ maxHeight: '200px', overflowY: 'auto' }}>
                      {thematicAreas.map((thematicArea) => (
                        <SelectItem key={thematicArea.id} value={thematicArea.id}>
                          {thematicArea.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="short_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Número</FormLabel>
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
                  <FormLabel>Nome da Ação</FormLabel>
                  <FormControl>
                    <Input placeholder="Qual Ação deseja cadastrar?" {...field} />
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
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Textarea {...field} />                    
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button variant="outline" type="submit">
              Cadastrar
            </Button>
          </form>
        </Form>
      </ScrollArea>
    </>
  );
}
