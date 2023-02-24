import React from "react";


function Footer() {
 return (
   <>
     <div
       className="flex flex-col items-center justify-center w-full h-auto pt-20 md:flex-row"
     >
       <div className="p-5 ">
           <p className="pb-6 font-serif text-3xl text-center text-gray-800 cursor-pointer">
             Napcat Blog
           </p>
       </div>
     </div>
     <div className="flex flex-col items-center justify-center p-5 text-center bg-gray-50">
       <h1 className="font-semibold text-gray-800 ">
         © 2023 All rights reserved | Built with ❤ by{""}
         <span className="font-semibold cursor-pointer hover:text-blue-600">
           Godsfavour{" "}
         </span>
       </h1>
     </div>
   </>
 );
}

export default Footer;
