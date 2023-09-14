"use client"
import GoogleBarChart from '@/components/chart/AreaChart';

export default function Home() {

  const labels = ['AC', 'AL', 'AP', 'AM', 'BA'];
  const data = [12, 19, 3, 5, 2];

  return (
    <div>
      <h1>Painel de Acompanhamento</h1>
      <div className="flex gap-2">
        <div className="flex">
            <GoogleBarChart labels={labels} data={data} title='Ações por Estado' />
        </div>
        <div className="flex">
            <GoogleBarChart labels={labels} data={data} title='Ações por Natureza de Despesa' />
        </div>
      </div>
      
      
    </div>
  );
}