import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { fetchDataFromAPI } from "../utils/fetch-api";

interface Instituition {
  id: string,
  short_name: string,
  name: string,
  created_at: string;
}
interface InstituitionPageProps {
  instituitions: Instituition[];
}

export default function InstituitionPage({ instituitions }: InstituitionPageProps) {

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

export async function getServerSideProps() {
  const data = await fetchDataFromAPI('instituition');

  if (Array.isArray(data.instituition)) {
    return {
      props: {
        instituitions: data.instituition,
      },
    };
  } else {
    console.error("Erro ao buscar");
    return {
      props: {
        instituitions: [],
      },
    };
  }
}
