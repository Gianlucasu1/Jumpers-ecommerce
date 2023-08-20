import { format } from "date-fns"

import prismadb from "@/lib/prismadb";

import { SizesClient } from "./components/client";
import { SizeColumn } from "./components/colums";
import axios from "axios";




const SizesPage = async ({ params }: { params: { storeId: string } }) => {
  console.log("Gianluca Casual")

  const tallas = await prismadb.size.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt : 'desc'
    }
  }); 

  const response = await axios(`http://localhost:3000/api/${params.storeId}/billboards`);
  

  const formattedSizes: SizeColumn[] = tallas.map( (item) => ({
    id: item.id,
    name: item.name,
    value:item.value,
    createdAt: format(item.createdAt, "dd/MM/yyyy")
  }))

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SizesClient data={formattedSizes} />        
      </div>
    </div>
  )
}

export default SizesPage;