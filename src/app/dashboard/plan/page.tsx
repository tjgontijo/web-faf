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
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface ThematicArea {
  id: string;
  short_name: string;
  name: string;
}
interface State {
  id: string;
  short_name: string;
  name: string;
}

interface Plan {
  id: string;
  year: string;
  state: State;
  thematicArea: ThematicArea;
  diagnosis: string;
  justification: string;
  generalGoal: string;
  implementationStrategy: string;
  diagnosticImplementationStrategy: string;
  governanceImplementationStrategy: string;
  capacityImplementationStrategy: string;
  acquisitionImplementationStrategy: string;
}

export default function Plan() {
    const [plans, setPlan] = useState<Plan[]>([]);

    async function fetchPlans() {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/plan`);
        const data = await response.json();        

        if (Array.isArray(data.plans)) {
          setPlan(data.plans);
        } else {
          console.error("Erro ao buscar áreas temáticas.");
        }
      } catch (error) {
        console.error("Erro ao buscar áreas temáticas:", error);
      }
    }

    useEffect(() => {
      fetchPlans();
    }, []);



  return (
    <>
      <ScrollArea className="w-full p-8 rounded-md">
        <div className="flex justify-between">
          <div className="flex">
            <h1 className="text-2xl font-semibold mb-4">Planos de Ação</h1>
          </div>
          <div className="flex">
            <Link href="/dashboard/plan/create">
              <Button size="icon">
                <Plus className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Ano</TableHead>
              <TableHead>Estado</TableHead>

            </TableRow>
          </TableHeader>

          <TableBody>
            {plans.map((plan) => (
              <TableRow key={plan.id}>
                <TableCell>{plan.year}</TableCell>               
                <TableCell>{plan.state.name}</TableCell>               
                <TableCell>{plan.thematicArea.short_name} - {plan.thematicArea.name}</TableCell>                 
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollArea >
    </>
  )
}
