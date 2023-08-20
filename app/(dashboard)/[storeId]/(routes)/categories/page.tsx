import { format } from "date-fns"

import prismadb from "@/lib/prismadb";

import { CategoryClient } from "./components/client";
import { CategoryColumn } from "./components/colums";
import axios from "axios";




const CategoriesPage = async ({ params }: { params: { storeId: string } }) => {
  console.log("Gianluca Casual")

  const categories = await prismadb.category.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      billboard: true,
    },
    orderBy: {
      createdAt : 'desc'
    }
  }); 

  const response = await axios(`http://localhost:3000/api/${params.storeId}/billboards`);
  

  const formattedCategories: CategoryColumn[] = categories.map( (item) => ({
    id: item.id,
    name: item.name,
    billboardLabel: item.billboard.label,
    createdAt: format(item.createdAt, "dd/MM/yyyy")
  }))

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryClient data={formattedCategories} />        
      </div>
    </div>
  )
}

export default CategoriesPage;