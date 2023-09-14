"use client"

import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDate } from "@/lib/utils";

interface ThematicArea {
  id: string;
  short_name: string;
  name: string;
}

interface Action {
  id: string;
  short_name: string;
  thematicArea: ThematicArea;
  name: string;
  created_at: string;
}


export default function Action() {

  const [actions, setActions] = useState<Action[]>([]); 

  async function fetchActions() {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/actions`);
      const data = await response.json();
      console.log("Dados da API:", data);

      if (Array.isArray(data.actions)) {
        setActions(data.actions);
      } else {
        console.error("Erro ao buscar áreas temáticas.");
      }
    } catch (error) {
      console.error("Erro ao buscar áreas temáticas:", error);
    }
  }

  useEffect(() => {
    fetchActions();
  }, []);

  return (
    <>
      <div className="pt-8">
        <h1>Ações</h1>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Área Temática</TableHead>
              <TableHead>Criado em</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {actions.map((action) => (
              <TableRow key={action.id}>
                <TableCell>{action.short_name} - {action.name}</TableCell>
                <TableCell>{action.thematicArea.short_name} - {action.thematicArea.name}</TableCell>
                <TableCell>{formatDate(action.created_at)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  )
}
