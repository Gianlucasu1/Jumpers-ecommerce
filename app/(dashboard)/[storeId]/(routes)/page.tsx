import { UserButton } from "@clerk/nextjs";
import prismadb from "@/lib/prismadb"
import { DashboardPageProps } from "@/types";



const Dashboardpage = async ({params}: DashboardPageProps) => {

  const store = await prismadb.store.findFirst({
    where:{
      id:params.storeId
    }
  })

  return (
    <div>
      Active Store: {store?.id}      
    </div>
  )
}

export default Dashboardpage;