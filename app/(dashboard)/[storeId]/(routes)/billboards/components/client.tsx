"use client"

import { block } from 'million/react';

import { useParams,useRouter } from "next/navigation"

import { Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { BillboardColumn, columns } from "./colums"
import { DataTable } from "@/components/ui/data-table"
import { ApiList } from "@/components/ui/api-list"

interface BillboarClientProps {
  data: BillboardColumn[];
}


export const BillboardClient = block( ( {data}  : BillboarClientProps) => {

  const router = useRouter();
  const params = useParams();

  

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Billboards (${data.length})`}
          description="Manage billboards for your store"
        />
        <Button onClick={() => router.push(`/${params.storeId}/billboards/new`)}>
          <Plus className="mr-2 h-4" />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="label" columns={columns} data={data}  />
      <Heading title="API" description="llamadas API para billboards" />
      <Separator />
      <ApiList entityName="billboards" entityIdName="billboardId" />
    </>
  )
});
