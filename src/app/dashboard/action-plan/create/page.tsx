"use client"

import React, { useEffect, useState } from "react";
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
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import { ArrowLeft, Plus } from "lucide-react";
import { useRouter } from 'next/navigation'

interface State {
  id: string;
  shortName: string;
  name: string;
}
interface ThematicArea {
  id: string;
  shortName: string;
  name: string;
}

const formSchema = z.object({
  year: z.string().min(4, {
    message: "Selecione um ano",
  }),
  state: z.string().min(1, {
    message: "Informe um Estado válido",
  }),
  thematicArea: z.string().min(1, {
    message: "Informe uma área temática válida",
  }),
  diagnosis: z.string().min(1, {
    message: "Informe um diagnóstico válido",
  }),
  justification: z.string().min(1, {
    message: "Informe uma justificação válida",
  }),
  generalGoal: z.string().min(1, {
    message: "Informe um objetivo geral válido",
  }),
  implementationStrategy: z.string().min(1, {
    message: "Informe uma estratégia de implementação válida",
  }),
  diagnosticImplementationStrategy: z.string().min(1, {
    message: "Informe uma estratégia de implementação de diagnóstico válida",
  }),
  governanceImplementationStrategy: z.string().min(1, {
    message: "Informe uma estratégia de implementação de governança válida",
  }),
  capacityImplementationStrategy: z.string().min(1, {
    message: "Informe uma estratégia de implementação de capacidade válida",
  }),
  acquisitionImplementationStrategy: z.string().min(1, {
    message: "Informe uma estratégia de implementação de aquisição válida",
  }),
});

export default function CreatePlan() {
  const router = useRouter()
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      year: "",
      state: "",
      thematicArea: "",
      diagnosis: "",
      justification: "",
      generalGoal: "",
      implementationStrategy: "",
      diagnosticImplementationStrategy: "",
      governanceImplementationStrategy: "",
      capacityImplementationStrategy: "",
      acquisitionImplementationStrategy: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/action-plans`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        router.push('/dashboard/action-plan')
      } else {
        const errorData = await response.json();
        console.error("Detalhes do erro:", errorData);
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
  }

  async function fetchStates() {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/states`);
      const data = await response.json();
      if (Array.isArray(data.states)) {
        setStates(data.states);
      } else {
        console.error("Erro ao buscar estados.");
      }
    } catch (error) {
      console.error("Erro ao buscar estados:", error);
    }
  }
  async function fetchThematicAreas() {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/thematic_area`);
      const data = await response.json();
      if (Array.isArray(data.thematicArea)) {
        setThematicAreas(data.thematicArea);
      } else {
        console.error("Erro ao buscar estados.");
      }
    } catch (error) {
      console.error("Erro ao buscar estados:", error);
    }
  }

  const [states, setStates] = useState<State[]>([]);
  const [thematicAreas, setThematicAreas] = useState<ThematicArea[]>([]);

  useEffect(() => {
    fetchStates();
    fetchThematicAreas();
  }, []);

  return (
    <>
      <ScrollArea className="w-full p-8 rounded-md">
        <div className="flex justify-between">
          <div className="flex">
            <h1 className="text-2xl font-semibold mb-4">Ações</h1>
          </div>
          <div className="flex">
            <Link href="/dashboard/action-plan">
              <Button variant="outline" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 p-2" >
            <FormField
              control={form.control}
              name="year"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ano</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a fruit" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent style={{ maxHeight: '200px', overflowY: 'auto' }}>
                      <SelectItem value="2022">2022</SelectItem>
                      <SelectItem value="2023">2023</SelectItem>
                      <SelectItem value="2024">2024</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="state"
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
            <FormField
              control={form.control}
              name="thematicArea"
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
              name="diagnosis"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Diagnóstico</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="justification"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Justificativa</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="generalGoal"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Objetivo Geral</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="implementationStrategy"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Estratégia de Implementação</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="diagnosticImplementationStrategy"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Estratégia de Implementação de Diagnóstico</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="governanceImplementationStrategy"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Estratégia de Implementação de Governança</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="capacityImplementationStrategy"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Estratégia de Implementação de Capacidade</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="acquisitionImplementationStrategy"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Estratégia de Implementação de Aquisição</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end">
              <Button variant="default" type="submit">Cadastrar Novo Plano</Button>
            </div>
          </form>
        </Form>
      </ScrollArea>
    </>
  );
}
