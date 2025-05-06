"use client";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
//import { sidebarLinks } from "@/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
//import Footer from "./Footer";

const MobileNav = ({ user }: MobileNavProps) => {
  const pathname = usePathname();

  const sidebarLinks = [
    {
      imgURL: "/icons/home.svg",
      label: "Home",
      route: "/",
    },
    {
      imgURL: "/icons/dollar-circle.svg",
      label: "My Banks",
      route: "/my-banks",
    },
    {
      imgURL: "/icons/transaction.svg",
      label: "Transaction History",
      route: "/transaction-history",
    },
    {
      imgURL: "/icons/money-send.svg",
      label: "Transfer Funds",
      route: "/payment-transfer",
    },
  ];

  return (
    <section className='w-fulll max-w-[264px]'>
      <Sheet>
        <SheetTrigger>
          <Image
            src='/icons/hamburger.svg'
            width={30}
            height={30}
            alt='menu'
            className='cursor-pointer'
          />
        </SheetTrigger>
        <SheetContent side='left' className='border-none bg-white'>
          <Link
            href='/'
            className='cursor-pointer flex items-center gap-1 px-4'
          >
            <Image
              src='/icons/logo.png'
              width={34}
              height={34}
              alt='Horizon logo'
            />
            <h1 className='text-26 font-ibm-plex-serif font-bold text-black-1'>
              Horizon
            </h1>
          </Link>
          <div className='lex h-[calc(100vh-72px)] flex-col justify-between overflow-y-auto'>
            <SheetClose asChild>
              <nav className='flex h-full flex-col gap-6 pt-16 text-white'>
                {sidebarLinks.map(item => {
                  const isActive =
                    pathname === item.route ||
                    pathname.startsWith(`${item.route}/`);

                  return (
                    <SheetClose asChild key={item.route}>
                      <Link
                        href={item.route}
                        key={item.label}
                        className={cn(
                          "flex gap-3 items-center p-4 rounded-lg w-full max-w-60 ",
                          {
                            "bg-bank-gradient": isActive,
                          }
                        )}
                      >
                        <Image
                          src={item.imgURL}
                          alt={item.label}
                          width={20}
                          height={20}
                        />
                        <p
                          className={cn("text-16 font-semibold text-black-2", {
                            "text-white": isActive,
                          })}
                        >
                          {item.label}
                        </p>
                      </Link>
                    </SheetClose>
                  );
                })}
                USER
              </nav>
            </SheetClose>

            {/* <Footer user={user} type='mobile' /> */}
          </div>
        </SheetContent>
      </Sheet>
    </section>
  );
};

export default MobileNav;
