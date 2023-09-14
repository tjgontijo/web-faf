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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const formSchema = z.object(
  {
    name: z.string().min(1, {
      message: "Informe um nome válido"
    }),
    email: z.string().email( {
      message: "Informe um e-mail válido",
    }),
    password: z.string().min(6, {
      message: "Informe uma senha válida",
    }),
    stateId: z.string().min(1, {
      message: "Informe um Estado válido",
    }),
  }
)

export default function SignUp() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      stateId: "",
      password: "",
    }
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        form.reset();
        console.log("Usuário cadastrado com sucesso!");
      } else {
        // Lide com erros na resposta do servidor
        console.error("Erro ao cadastrar o usuário:", response.status);
        const errorData = await response.json();
        console.error("Detalhes do erro:", errorData);
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
  }

  interface State {
    id: string;
    email: string;
    name: string;
  }

  const [states, setStates] = useState<State[]>([]);

  async function fetchStates() {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/states`);
      const data = await response.json();
      console.log("Dados da API:", data);

      if (Array.isArray(data.states)) {
        setStates(data.states);
      } else {
        console.error("Erro ao buscar áreas temáticas.");
      }
    } catch (error) {
      console.error("Erro ao buscar áreas temáticas:", error);
    }
  }
  useEffect(() => {
    fetchStates();
  }, []);

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-96">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-mail</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"            
            render={({ field }) => (
              <FormItem>
                <FormLabel>Senha</FormLabel>
                <FormControl>
                  <Input {...field} type="password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="stateId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Estado</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent style={{ maxHeight: '200px', overflowY: 'auto' }}>
                    {states.map((state) => (
                      <SelectItem key={state.id} value={state.id}>
                        {state.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button variant="outline" type="submit">Cadastrar</Button>
        </form>
      </Form>     
    </>
  )
}