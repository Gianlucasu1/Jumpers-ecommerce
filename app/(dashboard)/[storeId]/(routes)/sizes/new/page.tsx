import prismadb from "@/lib/prismadb";
import { SizeForm } from "../[sizeId]/components/size-form";


const SizePage = async ( { params } : { params : { billboardId: string}} ) => {

  const variante_null = null;

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SizeForm initialData={variante_null} />
      </div>
    </div>
  )
}

export default SizePage;