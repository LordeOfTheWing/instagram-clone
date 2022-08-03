import Image from "next/image";
import {
  SearchIcon,
  PlusCircleIcon,
  UserGroupIcon,
  HeartIcon,
  PaperAirplaneIcon,
  MenuIcon,
} from "@heroicons/react/outline";

import { HomeIcon } from "@heroicons/react/solid";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { modalState } from "../atoms/modalAtom";

const Header = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [open, setOpen] = useRecoilState(modalState);

  return (
    <div
      className='shadow-sm bg-white sticky top-0 z-50 border-b
    '>
      <div
        className='flex justify-between bg-white max-w-6xl mx-5
      lg:mx-auto
      '>
        {/* left */}
        <div
          onClick={() => router.push("/")}
          className='relative w-24 hidden lg:inline-grid'>
          <Image
            src='https://links.papareact.com/ocw'
            layout='fill'
            objectFit='contain'
          />
        </div>

        <div
          onClick={() => router.push("/")}
          className='relative w-10  lg:hidden flex-shrink-0 cursor-pointer'>
          <Image
            src='https://links.papareact.com/jjm'
            layout='fill'
            objectFit='contain'
          />
        </div>

        {/* middle */}
        <div className='max-w-xs'>
          <div className='mt-1 relative p-3 rounded-md '>
            <div
              className='absolute inset-y-0 pl-3 flex items-center 
            pointer-events-none '>
              <SearchIcon className='h-5 w-5 text-gray-400' />
            </div>
            <input
              className='bg-gray-50 block w-full pl-10 sm:text-sm border-gray-300
            rounded-md focus:ring-black focus:border-black'
              type='text'
              placeholder='Search'
            />
          </div>
        </div>
        {/* right */}
        <div className='flex items-center justify-end space-x-4'>
          <HomeIcon onClick={() => router.push("/")} className='navButton' />
          <MenuIcon className='h-6 md:hidden cursor-pointer' />
          {session ? (
            <>
              <div className='relative navButton'>
                <PaperAirplaneIcon className='navButton rotate-45' />
                <div
                  className='absolute -top-2 -right-1 text-sm w-5 h-5
              bg-red-500 rounded-full flex items-center justify-center
              animate-pulse text-white
              '>
                  4
                </div>
              </div>

              <PlusCircleIcon
                onClick={() => setOpen(true)}
                className='navButton'
              />
              <UserGroupIcon className='navButton' />
              <HeartIcon className='navButton' />

              <img
                onClick={signOut}
                src={session?.user?.image!}
                alt='Profile Picture'
                className='h-10 w-10 rounded-full cursor-pointer'
              />
            </>
          ) : (
            <button onClick={signIn}>Sign in</button>
          )}
        </div>
      </div>
    </div>
  );
};
export default Header;
