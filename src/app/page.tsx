import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

export default function Home() {

  return (
      <div className="flex justify-center h-screen items-center">
        <Link href="/dashboard">
          <Button>
            <Plus className="h-4 w-4 pr-1" /> Entrar
          </Button>
        </Link>
      </div>
  );
}