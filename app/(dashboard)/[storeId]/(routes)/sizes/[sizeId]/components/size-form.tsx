"use client"

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Trash } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";

import { Heading } from "@/components/ui/heading"
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AlertModal } from "@/components/modals/alert-modal";
import { Billboard, Size, Store } from "@prisma/client";
import { ImageUpload } from "@/components/ui/image-upload";


interface SizeFormProps {
  initialData: Size | null
}


const formSchema = z.object({
  name: z.string().min(1),
  value: z.string().min(1),
})

type SizeFormValues = z.infer<typeof formSchema>;


export const SizeForm: React.FC<SizeFormProps> = ({
  initialData
}) => {

  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? "Editar talla" : "Crear talla"
  const description = initialData ? "Editar una talla" : "Agregar nueva talla"
  const toastMessage = initialData ? "Talla actualizado" : "Talla creada";
  const action = initialData ? "Guardar cambios" : "Crear talla"


  const form = useForm<SizeFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      value: ""
    }
  });

  const onSubmit = async (data2: SizeFormValues) => {
    try {
      setLoading(true);

      if (initialData) {
        const response = await axios.patch(`/api/${params.storeId}/sizes/${params.sizeId}`, data2);

      } else {
        const response = await axios.post(`/api/${params.storeId}/sizes/`, data2)
      }

      router.refresh();
      router.push(`/${params.storeId}/sizes/`)
      toast.success(toastMessage)

    } catch (error) {
      toast.error("Algo anduvo mal");
    } finally {
      setLoading(false);
    }
  }

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/${params.storeId}/sizes/${params.sizeId}`)
      router.refresh();
      router.push(`/${params.storeId}/sizes`);
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
      <AlertModal isOpen={open} onClose={() => { setOpen(false) }} onConfirm={onDelete} loading={loading} />
      <div className="flex items-center justify-between">
        <Heading
          title={title}
          description={description}
        />

        {initialData ?
          <Button
            disabled={loading}
            variant="destructive"
            size="icon"
            onClick={() => { setOpen(true) }}
          >
            <Trash className="h-4 w-4" />
          </Button> : <></>}
      </div>

      <Separator />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">          
          <div className="grid grid-cols-3 gap-8">
          <FormField control={form.control} name="name" render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Nombre
                </FormLabel>
                <FormControl>
                  <Input disabled={loading} placeholder="Nombre de talla" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="value" render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Value
                </FormLabel>
                <FormControl>
                  <Input disabled={loading} placeholder="Valor de la talla" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  )
}
