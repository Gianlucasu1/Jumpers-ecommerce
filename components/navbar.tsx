import { UserButton, auth } from "@clerk/nextjs"
import { MainNav } from "@/components/main-nav"
import { StoreSwitcher } from "./store-switcher"
import { redirect } from "next/navigation";
import prismadb from "@/lib/prismadb";

export const Navbar = async () => {

  const { userId } = auth();

  if( !userId ){
    redirect("/sighn-in");
  }

  const stores = await prismadb.store.findMany({
    where:{
      userId: userId,
    }
  })

  return (
    <div className="border-b ">
      <div className="flex h-16 items-center px-4">
        <StoreSwitcher className="" items={stores} />
        <MainNav className="mx-6" />
        <div className="ml-auto flex items-center space-x-4">
          <UserButton afterSignOutUrl="/sign-in" />
        </div>
      </div>
    </div>
  )
}
