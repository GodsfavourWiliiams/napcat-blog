import Link from "next/link";
import React from "react";

type Props = {}

const header = (props: Props) => {
  return (
    <div className="bg-transparent backdrop-blur w-full py-4 w-full">
        <div className="flex items-center justify-between  mx-auto max-w-[1300px] px-2 sm:px-6 lg:px-8 w-full" >
          <div className="flex items-center ">
            <Link href='/' className="flex flex-shrink-0 items-center font-extrabold text-3xl">
              Napcat
            </Link>
          </div>
          <div className="flex items-center pr-2">
              <Link href="/archive" className="rounded-md bg-purple-200 py-2 px-5 ">
                <p>Archived</p>
              </Link>
          </div>
      </div>
    </div>
  )
}

export default header