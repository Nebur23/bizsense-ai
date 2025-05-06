import { AppSidebar } from "@/components/app-sidebar";
import MobileNav from "@/components/MobileNav";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function DashBoardLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { businessId: string };
}>) {
  const { businessId } = await params;
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });

  console.log("session", session);

  const id = session?.user.id;

  // const { userId } = await auth();
  //if (!userId) throw new Error("Unauthorized");

  const user = await prisma.user.findUnique({
    where: { id },
  });

  if (!user?.businessId) {
    redirect("/onboarding");
  }

  return (
    <SidebarProvider>
      <AppSidebar businessId={businessId} />
      <SidebarInset>
        <div className='flex size-full flex-col'>
          <div className='flex h-16 items-center justify-between p-5 shadow-creditCard sm:p-8 md:hidden'>
            <Image src='/icons/logo.png' width={30} height={30} alt='logo' />
            <div>
              <MobileNav user={user} />
            </div>
          </div>
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
