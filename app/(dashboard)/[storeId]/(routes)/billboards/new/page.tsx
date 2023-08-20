import prismadb from "@/lib/prismadb";
import { BillboardForm } from "../[billboardId]/components/billboard-form";


const BillboardPage = async ( { params } : { params : { billboardId: string}} ) => {

  const billboard = await prismadb.billboard.findFirst({
    where: {
      id: params.billboardId,
    }
  })

  const variante_null = null;

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardForm initialData={variante_null} />
      </div>
    </div>
  )
}

export default BillboardPage;