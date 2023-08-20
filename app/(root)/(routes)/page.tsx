"use client"

import Image from 'next/image'
import { UserButton } from "@clerk/nextjs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Modal } from '@/components/ui/modal';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useStoreModalStore } from '@/hooks/use-store-modal';

const SetupPage = () => {

  //Global state variables
  const { isOpen, onClose, onOpen } = useStoreModalStore();

  useEffect(() => {
    if(!isOpen) {
      onOpen();
    }
  },[isOpen, onOpen])

  

  const handleModalChange = () => {

    if(isOpen) {
      onClose(); return;
    }
    else {
      onOpen(); 
    }
    
    
  }

  return null;
}

export default SetupPage; 