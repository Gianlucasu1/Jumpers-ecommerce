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
import { Billboard, Category } from "@prisma/client";
import { Select, SelectContent, SelectItem, SelectValue,SelectTrigger } from "@/components/ui/select";




interface CategoryFormProps {
  billboards: Billboard[];
  initialData: Category | null
}


const formSchema = z.object({
  name: z.string().min(1),
  billboardId: z.string().min(1),
})

type CategoryFormValues = z.infer<typeof formSchema>;


export const CategoryForm: React.FC<CategoryFormProps> = ({
  initialData,
  billboards
}) => {

  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? "Editar categoría" : "Crear categoría"
  const description = initialData ? "Editar un categoría" : "Agregar nuevo categoría"
  const toastMessage = initialData ? "Categoría actualizado" : "Categoría creado";
  const action = initialData ? "Guardar cambios" : "Crear Categoría"


  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      billboardId: ""
    }
  });

  const onSubmit = async (data2: CategoryFormValues) => {
    try {
      setLoading(true);

      if (initialData) {
        const response = await axios.patch(`/api/${params.storeId}/categories/${params.categoryId}`, data2);

      } else {
        const response = await axios.post(`/api/${params.storeId}/categories/`, data2)
      }

      router.refresh();
      router.push(`/${params.storeId}/categories/`)
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
      await axios.delete(`/api/${params.storeId}/categories/${params.categoryId}`)
      router.refresh();
      router.push(`/${params.storeId}/categories`);
      toast.success("Categoría eliminada correctamente");
    } catch (error) {
      toast.error("Asegúrate de remover todos los productos de la categoría antes de eliminarla.");
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
                  Name
                </FormLabel>
                <FormControl>
                  <Input disabled={loading} placeholder="Nombre de la  categoría" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <FormField control={form.control} name="billboardId" render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Billboard
                </FormLabel>
                <Select
                  disabled={loading}
                  onValueChange={field.onChange}
                  value={field.value}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        defaultValue={field.value}
                        placeholder="Selecciona el billboard"
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {billboards.map((billboard) => (
                      <SelectItem
                      key={billboard.id}
                      value={billboard.id}
                      >
                        {billboard.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
