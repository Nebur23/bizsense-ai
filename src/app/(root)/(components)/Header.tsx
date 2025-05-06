import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { LayoutDashboard } from "lucide-react";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import UserDropdown from "./UserButton";

const HeaderBox = async () => {
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });

  const name = session?.user.name;
  const email = session?.user.email;
  // const user = await checkUser();
  //const businessId = user?.businessId;

  //const link = businessId ? `/dashboard/${businessId}` : "/onboarding";

  const link = "";

  return (
    <div className='fixed top-0 z-50 flex w-full  bg-white p-4 backdrop-blur-md border-b'>
      <div className='max-w-5xl w-full mx-auto flex items-center justify-between'>
        <div className='font-cal font-bold'>
          <Link href='/' className='flex items-center gap-3'>
            <div className='flex items-center justify-center'>
              <Image
                src='/icons/logo.png'
                width={100}
                height={100}
                alt='Horizon logo'
                className='h-13 w-auto'
              />
            </div>
            <span className='text-xl tracking-wider font-inter text-cyan-500 font-semibold relative -left-6 '>BizSense AI</span>
          </Link>
        </div>

        <div className='flex items-center gap-2'>
          {/* <SignedOut>
            <SignInButton forceRedirectUrl={link}>
              <Button variant={"outline"}>Login</Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <div className='flex flex-row items-center gap-2'>
              <UserButton />
              <Link href={link}>
                <Button variant={"outline"}>
                  <LayoutDashboard />
                  <span className='hidden md:inline'>Dashboard</span>
                </Button>
              </Link>
            </div>
          </SignedIn> */}

          {session ? (
            <div className='flex flex-row items-center gap-2'>
              <UserDropdown name={name} email={email} />
              <Button variant={"outline"}>
                <LayoutDashboard />
                <span className='hidden md:inline'>Dashboard</span>
              </Button>
            </div>
          ) : (
            <Link href='/signin'>
              <Button variant={"outline"}>Sign In</Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeaderBox;
