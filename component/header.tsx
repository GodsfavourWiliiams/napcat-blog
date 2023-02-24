import Link from "next/link";
import React from "react";

function Header() {

    return (
     
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 ">
        <div className="fixed flex h-16 items-center justify-between">
          
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <Link href='/' className="flex flex-shrink-0 items-center font-extrabold text-xl">
              Napcat
            </Link>
            <div className="hidden sm:ml-6 sm:block">
              
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <button
              className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
            >
              <Link href="/archive">
                <p>Archived Posts</p>
              </Link>
            </button>
          </div>
      </div>
    </div>
 );
}

export default Header;
