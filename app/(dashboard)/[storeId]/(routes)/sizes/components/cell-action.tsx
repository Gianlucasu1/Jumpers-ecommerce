"use client"

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { SizeColumn } from "./colums"
import { Button } from "@/components/ui/button"
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react"
import { toast } from "react-hot-toast"
import { useParams, useRouter } from "next/navigation"
import { useState } from "react"
import axios from "axios"
import { AlertModal } from "@/components/modals/alert-modal"

interface CellActionProps {
  data: SizeColumn
}

export const CellAction: React.FC<CellActionProps> = ({
  data
}) => {

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const params = useParams();
  const router = useRouter();

  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.success("Size ID copiada correctamente")
  }

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/${params.storeId}/sizes/${data.id}`)
      router.refresh();      
      toast.success("Talla eliminada correctamente");
    } catch (error) {
      toast.error("Asegúrate de remover todos los productos que usen esta talla antes de eliminarla.");
      console.log(error);
    } finally {
      setLoading(false);
      setOpen(false);
    }
  }


  return (
    <>
    <AlertModal isOpen={open} onClose={() => setOpen(false)} onConfirm={() => onDelete()} loading={loading}   />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open Menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>
            Acciones
          </DropdownMenuLabel>
          <DropdownMenuItem onClick={() => { router.push(`/${params.storeId}/sizes/${data.id}`) }}>
            <Edit className="h-4 w-4 mr-2" />
            Actualizar
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onCopy(data.id)}>
            <Copy className="h-4 w-4 mr-2" />
            Copiar ID
          </DropdownMenuItem>
          <DropdownMenuItem onClick={()=> setOpen(true)}>
            <Trash className="h-4 w-4 mr-2" />
            Eliminar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}