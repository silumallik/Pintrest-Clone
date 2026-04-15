"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState(""); // error / success

  const handleSubmit = async (e) => {
    e.preventDefault();

    // NAME CHECK
    if (!form.name) {
      setType("error");
      setMessage("Name is required");
      return;
    }

    // EMAIL CHECK
    if (!form.email) {
      setType("error");
      setMessage("Email is required");
      return;
    }

    // GMAIL DOMAIN CHECK
    if (!form.email.endsWith("@gmail.com")) {
      setType("error");
      setMessage("Please type (example@gmail.com) correctly");
      return;
    }

    // PASSWORD CHECK
    if (!form.password) {
      setType("error");
      setMessage("Password is required");
      return;
    }

    await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify(form),
    });

    setType("success");
    setMessage("Account created successfully ✅");

    router.push("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4" style={{ padding: "0 8%" }}>

      <div className="w-full h-100 max-w-md bg-white shadow-xl rounded-2xl px-8 py-10">

        {/* Heading (thoda niche) */}
        <h2 className="text-3xl font-bold text-slate-800 text-center mt-4 mb-10" style={{ marginTop: "10px" }}>
          Create Account
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

        <form
          onSubmit={handleSubmit}
          className="flex h-70 flex-col items-center gap-6 justify-around "
        >

          <input
            type="text"
            placeholder="Name"
            style={{ padding: "2% 10px", marginTop: "39px" }}
            className="w-4/5 h-10 px-5 py-4 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-600 transition duration-200"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <input
            type="email"
            placeholder="Email"
            style={{ padding: "2% 10px" }}
            className="w-4/5 h-10 px-5 py-4 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-600 transition duration-200"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          {/* <input
          type="password"
          placeholder="Password"
          style={{padding:"0 10px"}}
          className="w-4/5 h-10 px-5 py-4 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-600 transition duration-200"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        /> */}

          <div className="relative w-4/5">

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              style={{ padding: "0 10px" }}
              className="w-full h-10 px-5 py-4 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-600 transition duration-200"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2 text-slate-600"
            >
              {showPassword ? "👁️" : "🙈"}
            </button>

          </div>

          {/* Button (thoda upar from bottom) */}
          <button
            type="submit"
            style={{ padding: "1% 0" }}
            className="w-4/5 h-10 mt-6 mb-2 bg-slate-800 hover:bg-slate-900 text-white font-semibold py-4 rounded-xl transition duration-300 cursor-pointer"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );

}
