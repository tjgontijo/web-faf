"use client"
import GoogleBarChart from '@/components/chart/AreaChart';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function Home() {

  const labels = ['AC', 'AL', 'AP', 'AM', 'BA'];
  const data = [12, 19, 3, 5, 2];

  return (
    <>
      <ScrollArea className="w-full p-8 rounded-md">
        <div className="flex justify-between">
          <div className="flex">
            <h1 className="text-2xl font-semibold mb-4">Painel de Acompanhamento</h1>
          </div>
          <div className="flex">          
          </div>
        </div>
      <div className="flex w-full">
        <div className="flex w-1/2">
            <GoogleBarChart labels={labels} data={data} title='Ações por Estado' />
        </div>
        <div className="flex w-1/2">
            <GoogleBarChart labels={labels} data={data} title='Ações por Natureza de Despesa' />
        </div>
      </div> 
      </ScrollArea> 
    </>
  );
}