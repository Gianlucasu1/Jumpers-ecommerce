"use client"

import { AlertModalProps } from "@/types"
import { useEffect, useState } from "react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components//ui/button";



export const AlertModal = ({isOpen, onClose, onConfirm, loading}: AlertModalProps) => {
  
  const [ isMounted, setIsMounted ] = useState(false);

  useEffect(() => {
    setIsMounted(true);    
  },[]);

  if(!isMounted) {
    return null;
  }
  
  return(
    <Modal
      title="¿Estás seguro de hacer este cambio?"
      description="Esta acción no puede ser revertida"
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="pt-6 space-x-2 flex items-center justify-end w-full">
        <Button disabled={loading} variant="outline" onClick={onClose}>
          Cancelar
        </Button>
        <Button disabled={loading} variant="destructive" onClick={onConfirm}>
          Continuar
        </Button>
      </div>
    </Modal>
  )
}