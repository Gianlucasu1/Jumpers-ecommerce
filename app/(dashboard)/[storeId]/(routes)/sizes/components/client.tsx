"use client"
import { useParams,useRouter } from "next/navigation"

import { Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { SizeColumn, columns } from "./colums"
import { DataTable } from "@/components/ui/data-table"
import { ApiList } from "@/components/ui/api-list"

interface SizeClientProps {
  data: SizeColumn[];
}


export const SizesClient = ( {data}  : SizeClientProps) => {

  const router = useRouter();
  const params = useParams();

  

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Sizes (${data.length})`}
          description="Edita las tallas de tu tienda"
        />
        <Button onClick={() => router.push(`/${params.storeId}/sizes/new`)}>
          <Plus className="mr-2 h-4" />
          Agregar nuevo
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data}  />
      <Heading title="API" description="llamadas API para tallas" />
      <Separator />
      <ApiList entityName="sizes" entityIdName="sizeId" />
    </>
  )
}
