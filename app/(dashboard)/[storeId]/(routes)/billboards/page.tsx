import { format } from "date-fns"

import prismadb from "@/lib/prismadb";

import { BillboardClient } from "./components/client";
import { BillboardColumn } from "./components/colums";
import axios from "axios";




const BillboardsPage = async ({ params }: { params: { storeId: string } }) => {
  console.log("Gianluca Casual")

  const billboards = await prismadb.billboard.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt : 'desc'
    }
  }); 

  const response = await axios(`http://localhost:3000/api/${params.storeId}/billboards`);
  

  const formattedBillboards: BillboardColumn[] = billboards.map( (item) => ({
    id: item.id,
    label: item.label,
    createdAt: format(item.createdAt, "dd/MM/yyyy")
  }))

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardClient data={formattedBillboards} />        
      </div>
    </div>
  )
}

export default BillboardsPage;