import prismadb from "@/lib/prismadb";
import { CategoryForm } from "../[categoryId]/components/category-form";


const BillboardPage = async ( { params } : { params : { billboardId: string, storeId:string}} ) => {

  const billboards = await prismadb.billboard.findMany({
    where: {
      storeId: params.storeId,
    }
  })

  const variante_null = null;

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryForm billboards={billboards} initialData={variante_null} />
      </div>
    </div>
  )
}

export default BillboardPage;