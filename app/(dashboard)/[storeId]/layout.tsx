import { Navbar } from "@/components/navbar";
import prismadb from "@/lib/prismadb";
import { DashboardLayoutTypes } from "@/types";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation"

export default async function DashboardLayout({
  children,
  params,

}: DashboardLayoutTypes
) {
  const { userId } = auth();

  if( !userId ){
    redirect('/sign-in')
  }

  const store = await prismadb.store.findFirst({
    where:{
      id:params.storeId,
      userId
    }
  });

  if(!store) {
    redirect('/');
  }

  return(
    <>
      <div>
        <Navbar />
      </div>
      {children}
    </>
  )
}