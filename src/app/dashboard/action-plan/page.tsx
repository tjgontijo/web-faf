"use client"

import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDate } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface Instituition {
  id: string,
  short_name: string,
  name: string,
  created_at: string;
}

export default function Instituition() {

  const [instituitions, setInstituitions] = useState<Instituition[]>([]); // Fix the variable name here

  async function fetchInstituitions() { // Fix the function name here
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/instituition`);
      const data = await response.json();
      //console.log("Dados da API:", data);

      if (Array.isArray(data.instituition)) {
        setInstituitions(data.instituition);
      } else {
        console.error("Erro ao buscar áreas temáticas.");
      }
    } catch (error) {
      console.error("Erro ao buscar áreas temáticas:", error);
    }
  }

  useEffect(() => {
    fetchInstituitions();
  }, []);

  return (
    <>
      <ScrollArea className="w-full p-8 rounded-md">
        <div className="flex justify-between">
          <div className="flex">
            <h1 className="text-2xl font-semibold mb-4">Planos de Ação</h1>
          </div>
          <div className="flex">
            <Link href="/dashboard/action-plan/create">
              <Button size="icon">
                <Plus className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Sigla</TableHead>
              <TableHead>Nome</TableHead>
              <TableHead>Criado em</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {instituitions.map((instituition) => (
              <TableRow key={instituition.id}>
                <TableCell>{instituition.short_name}</TableCell>
                <TableCell>{instituition.name}</TableCell>
                <TableCell>{formatDate(instituition.created_at)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollArea >
    </>
  )
}
