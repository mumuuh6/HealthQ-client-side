"use client";
import {signIn, useSession} from "next-auth/react";



export default function MumuPage() {
    const session=useSession();
return(
<div className="flex flex-col items-center justify-center h-screen">
  <h1 className="text-4xl font-bold">Mumu Page</h1>
  <p className="mt-4 text-lg">This is the Mumu page.</p>
  <p className="mt-2 text-sm text-gray-500">You can add your content here.</p>  
  <button onClick={()=>signIn()}>Login</button>
  <p>{JSON.stringify(session)}</p>
</div>
)
}