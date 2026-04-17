"use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();
  return (
    <nav className="flex items-center justify-between px-6 py-4 shadow-sm bg-pink-400 sticky top-0 z-50">
      <Link href="/" className="text-xl font-bold text-white-500" style={{padding:".8% 1%"}}>
        PinClone
      </Link>

      <div className="flex items-center gap-5 justify-between" style={{padding:".8% 1%"}}>
        <Link href="/">Home</Link>
        <Link href="/search">Search</Link>

        {session && (
          <>
            <Link href="/create" className="text-white-500">Create</Link>
            {session?.user?.id && (
              <Link href={`/profile/${session.user.id}`}>Profile</Link>
            )}
          </>
        )}
      
        
        {!session && (
          <>
            <Link href="/login">Login</Link>
            <Link href="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
