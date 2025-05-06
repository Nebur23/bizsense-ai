"use client";

import { Info, Settings, LogOut, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";

export default function UserDropdown({
  name,
  email,
}: {
  name?: string;
  email?: string;
}) {
  return (
    <div className='relative'>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            size='lg'
            variant='outline'
            className='w-9 h-9 rounded-full bg-white'
          >
            <User className='w-4 h-4 text-blue-600' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='w-80 p-0 mr-4 rounded-lg' align='end'>
          <div className='p-4 flex items-center gap-3'>
            <div className='w-10 h-10 rounded-full border border-blue-300 flex items-center justify-center'>
              <User className='w-4 h-4 text-blue-600' />
            </div>
            <div>
              <h3 className='font-medium text-gray-800'> {name} </h3>
              <p className='text-sm text-gray-500'>{email} </p>
            </div>
          </div>

          <DropdownMenuItem className='px-4 py-2 cursor-pointer'>
            <Settings className='w-5 h-5 text-gray-400 mr-3' />
            <span>Subscriptions</span>
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => {
              authClient.signOut();
              redirect("/signin");
            }}
            className='px-4 py-2 cursor-pointer'
          >
            <LogOut className='w-5 h-5 text-gray-400 mr-3' />
            <span>Sign Out</span>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <div className='p-4 flex items-center justify-center text-xs text-gray-400'>
            <span className='ml-1 font-medium'>BizSense AI</span>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
