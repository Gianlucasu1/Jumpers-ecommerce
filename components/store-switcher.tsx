"use client";
import React, { useState } from 'react'

import { Check, ChevronsUpDownIcon, PlusCircle, Store as StoreIcon } from 'lucide-react';

import { useStoreModalStore } from '@/hooks/use-store-modal';
import { StoreSwitcherProps } from '@/types'
import { Store } from '@prisma/client';
import { useParams, useRouter } from 'next/navigation';


import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { 
  Command,
  CommandEmpty, 
  CommandGroup, 
  CommandInput, 
  CommandItem, 
  CommandList, 
  CommandSeparator
} from '@/components/ui/command';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';


export const StoreSwitcher = ({
  className,
  items=[]
}: StoreSwitcherProps) => {

  const [open, setOpen ] = useState(false);

  const storeModal = useStoreModalStore();
  const params = useParams();
  const router = useRouter();

  const formattedItems = items.map((item) => ({
    label: item.name,
    value: item.id
  }));

  const currentStore = formattedItems.find((item) => item.value === params.storeId);

  const onStoreSelect = ( store: {value:string, label: string} ) =>{
    setOpen(false);
    router.push(`/${store.value}`)
  }

  return (
    <Popover open={open} onOpenChange={() => { setOpen(true) }}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          role="combobox"
          aria-expanded={open}
          aria-label='Selecciona una e-commerce'
          className={cn("w-[200px] justify-between", className)}
        >          
          <StoreIcon className='mr-2 h-4 w-4' />
          {currentStore?.label }
          <ChevronsUpDownIcon className="ml-auto h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandList>
            <CommandInput placeholder='Buscar E-commerce...' />
            <CommandEmpty>
              No se ha encontrado el E-commerce
            </CommandEmpty>
            <CommandGroup heading="Tiendas E-commerce">
              { formattedItems.map((store)=>(
                <CommandItem className="text-sm" key={store.value} onSelect={() => {onStoreSelect(store)}}>
                  <StoreIcon className='mr-2 h-4 w-4' />
                  {store.label}
                  <Check className={cn("ml-auto h-4 w-4", currentStore?.value === store.value ? "opacity-100" : "opacity-0")} />

                </CommandItem>                
              ))}
            </CommandGroup>
          </CommandList>
          <CommandSeparator />
          <CommandList>
            <CommandGroup>
              <CommandItem className='cursor-pointer' onSelect={() => {
                setOpen(false);
                storeModal.onOpen();
              }}
              >
                <PlusCircle className="mr-2 h-5 w-5" />
                Crear tienda e-commerce
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>  
  )
}
