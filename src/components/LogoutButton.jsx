"use client";

import { signOut } from "next-auth/react";

export default function LogoutButton() {

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/login" });
  };

  return (
    <button
      onClick={handleLogout}
      style={{padding:".5% 2.4%", margin:"1%",cursor:"pointer"}}
      className="mt-4 px-6 py-2 bg-red-600 hover:bg-red-700 font-semibold transition text-white rounded-md"
    >
      Logout
    </button>
  );
}