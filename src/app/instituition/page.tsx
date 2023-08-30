"use client"
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
      const response = await fetch("http://localhost:3333/instituition", { cache: 'force-cache' });
      const data = await response.json();
      console.log("Dados da API:", data);

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
      <div className="pt-8">
        <h1>Instituições</h1>
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
                <TableCell>{instituition.created_at}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  )
}
