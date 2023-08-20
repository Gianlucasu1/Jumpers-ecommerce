"use client"
import { useParams,useRouter } from "next/navigation"

import { Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { CategoryColumn, columns } from "./colums"
import { DataTable } from "@/components/ui/data-table"
import { ApiList } from "@/components/ui/api-list"

interface CategoryClientProps {
  data: CategoryColumn[];
}


export const CategoryClient = ( {data}  : CategoryClientProps) => {

  const router = useRouter();
  const params = useParams();

  

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Categorías (${data.length})`}
          description="Maneja las categorías de tu Ecommmerce"
        />
        <Button onClick={() => router.push(`/${params.storeId}/categories/new`)}>
          <Plus className="mr-2 h-4" />
          Añadir categoría
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="label" columns={columns} data={data}  />
      <Heading title="API" description="llamadas API para categorías" />
      <Separator />
      <ApiList entityName="categories" entityIdName="categoryId" />
    </>
  )
}
