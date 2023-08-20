import { Store } from "@prisma/client";

import { PopoverTrigger } from "./components/ui/popover";

export interface DashboardLayoutTypes {
  children: React.ReactNode;
  params: { storeId: string} 
}

interface DashboardPageProps {
  params : { storeId:string };
}

type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>

export interface StoreSwitcherProps extends PopoverTriggerProps{
  items: Store[];
}

export interface SettingsPageProps {
  params: {
    storeId: string;
  }
}

export interface SettingsFormsProps {
  initialData: Store
}


export interface HeadingProps {
  title: string;
  description: string
}

export interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean
}

export interface ApiAlertProps {
  title:string;
  description:string;
  variant:"public" | "admin";
}

export interface ImageUploadProps { 
  disabled: boolean;
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  value:string[];
}