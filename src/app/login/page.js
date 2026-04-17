"use client";

import { useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState(""); // success / error

  const validateGmail = (email) => {
    return email.endsWith("@gmail.com");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Email empty
    if (!form.email) {
      setType("error");
      setMessage("Email is required ");
      return;
    }

    if (!validateGmail(form.email)) {
      setType("error");
      setMessage("Please enter a valid Gmail address (example@gmail.com) ");
      return;
    }

    // Password empty
    if (!form.password) {
      setType("error");
      setMessage("Password is required ");
      return;
    }

    const res = await signIn("credentials", {
      ...form,
      redirect: false,
    });

    if (res.error) {
      setType("error");
      setMessage("Incorrect password");
      return;
    }

    setType("success");
    setMessage("Login successful ✅ ");

    const sessionRes = await fetch(`/api/auth/session`);
    const sessionData = await sessionRes.json();

    router.push(`/profile/${sessionData.user.id}`);

    // if (status === "authenticated" && session?.user?.id) {
    //     router.push(`/profile/${session.user.id}`);
    //   }

  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 px-4" style={{ padding: "0 5%" }}>

      {/* Login Card */}
      <div className="w-full h-100 max-w-lg 
                    bg-white rounded-2xl 
                    shadow-2xl py-10 px-10" style={{padding:"0 5%"}}>

        <h2 className="text-3xl font-bold text-center text-slate-800 mb-10" style={{ marginTop: "25px" }}>
          Welcome Back
        </h2>

        {/* FLASH MESSAGE */}
        {message && (
          <div 
            style={{marginTop:"4%"}}
            className={`text-center mb-4 p-3 rounded-lg font-small text-xs
            ${type === "error"
                ? "text-red-600"
                : "text-green-600"
              }`}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8 h-60" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-around", padding:"0% 25%"}}>

          {/* Iput Gmail */}
          <input
            type="email"
            placeholder="Email"
            style={{ padding: "0 10px" }}
            className="w-80 h-10 px-6 py-4 
                     rounded-xl 
                     border border-slate-300
                     focus:outline-none 
                     focus:ring-2 focus:ring-slate-800
                     focus:border-slate-800"
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          {/* Input Password */}
          <div className="relative w-80">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              style={{ padding: "0 10px" }}
              className="w-full h-10 px-6 py-4 
               rounded-xl 
               border border-slate-300
               focus:outline-none 
               focus:ring-2 focus:ring-slate-800
               focus:border-slate-800"
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2 text-slate-600"
            >
              {showPassword ? "👁️" : "🙈"}
            </button>
          </div>

          {/* Login Btn */}
          <button
            type="submit"
            className="w-80 h-10 bg-slate-900 text-white 
                     font-semibold py-4 rounded-xl 
                     hover:bg-slate-700 
                     transition duration-300 cursor-pointer">
            Login
          </button>

        </form>

        <p className="text-center text-sm text-slate-600 mt-10">
          Don’t have an account?{" "}
          <span className="font-semibold text-slate-900 cursor-pointer hover:underline">
            <Link href={"/register"}>Register</Link>
          </span>
        </p>

      </div>
    </div>
  );

}

