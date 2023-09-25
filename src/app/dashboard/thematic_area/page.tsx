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
import { Plus } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Types() {
  interface ThematicArea {
    id: string;
    short_name: string;
    name: string;
    created_at: string;
  }

  const [thematicAreas, setThematicAreas] = useState<ThematicArea[]>([]);

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

  useEffect(() => {
    fetchThematicAreas();
  }, []);

  return (
    <>
      <ScrollArea className="w-full p-8 rounded-md">
        <div className="flex justify-between">
          <div className="flex">
            <h1 className="text-2xl font-semibold mb-4">Área Temática</h1>
          </div>
          <div className="flex">
            <Link href="/dashboard/thematic_area/create">
              <Button size="icon">
                <Plus className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
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
              <TableCell>{formatDate(thematicArea.created_at)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </ScrollArea>
    </>
  );
}
