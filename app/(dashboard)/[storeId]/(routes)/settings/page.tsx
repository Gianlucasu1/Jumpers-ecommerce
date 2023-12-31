import prismadb from "@/lib/prismadb";
import { SettingsPageProps } from "@/types";
import { auth } from "@clerk/nextjs"
import { redirect, useParams } from "next/navigation";
import { SettingsForm } from "./components/settings-form";

const SettingsPage = async ({ params }: SettingsPageProps) => {

  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const store = await prismadb.store.findFirst({
    where: {
      id: params.storeId,
    }
  })

  if (!store) {
    redirect("/");
  }


  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6 ">
        <SettingsForm initialData={store} />
      </div>
    </div>
  )
}

export default SettingsPage;