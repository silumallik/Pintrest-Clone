"use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();
  {console.log(session);}
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



// "use client";

// import Link from "next/link";
// import { signOut, useSession } from "next-auth/react";
// import { useState, useEffect, useRef } from "react";
// import { useRouter } from "next/navigation";

// export default function Navbar() {
//   const { data: session } = useSession();
//   const [query, setQuery] = useState("");
//   const [results, setResults] = useState([]);
//   const [showDropdown, setShowDropdown] = useState(false);

//   const debounceRef = useRef(null);
//   const router = useRouter();

//   // 🔥 Debounced Search
//   useEffect(() => {
//     if (debounceRef.current) clearTimeout(debounceRef.current);

//     if (!query.trim()) {
//       setResults([]);
//       return;
//     }

//     debounceRef.current = setTimeout(async () => {
//       const res = await fetch(`/api/pins/search?q=${query}&page=1`);
//       const data = await res.json();
//       setResults(data.slice(0, 5));
//       setShowDropdown(true);
//     }, 500);
//   }, [query]);

//   const handleSelect = (id) => {
//     setShowDropdown(false);
//     setQuery("");
//     router.push(`/pin/${id}`);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!query.trim()) return;
//     router.push(`/search?q=${query}`);
//     setShowDropdown(false);
//   };

//   return (
//     <nav className="flex items-center justify-between px-6 py-4 shadow-sm bg-pink-400 sticky top-0 z-50">
      
//       {/* Logo */}
//       <Link href="/" className="text-xl font-bold text-white" style={{padding:".8% 1%"}}>
//         PinClone
//       </Link>

//       {/* 🔥 Search Bar */}
//       <div className="relative w-1/3">
//         <form onSubmit={handleSubmit}>
//           <input
//             type="text"
//             placeholder="Search..."
//             value={query}
//             onChange={(e) => setQuery(e.target.value)}
//             onFocus={() => results.length && setShowDropdown(true)}
//             className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none"
//           />
//         </form>

//         {/* Dropdown */}
//         {showDropdown && results.length > 0 && (
//           <div className="absolute w-full mt-2 bg-white text-black rounded-lg shadow-lg max-h-60 overflow-y-auto z-50">
//             {results.map((pin) => (
//               <div
//                 key={pin._id}
//                 onClick={() => handleSelect(pin._id)}
//                 className="flex items-center gap-3 p-3 hover:bg-gray-200 cursor-pointer"
//               >
//                 <img
//                   src={pin.image}
//                   className="w-10 h-10 object-cover rounded-md"
//                 />
//                 <span className="text-sm">{pin.title}</span>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       {/* Right Menu */}
//       <div className="flex items-center gap-5 justify-between" style={{padding:".8% 1%"}}>
//         <Link href="/">Home</Link>

//         {session && (
//           <>
//             <Link href="/create">Create</Link>
//             {session?.user?.id && (
//               <Link href={`/profile/${session.user.id}`}>Profile</Link>
//             )}
//           </>
//         )}

//         {!session && (
//           <>
//             <Link href="/login">Login</Link>
//             <Link href="/register">Register</Link>
//           </>
//         )}
//       </div>
//     </nav>
//   );
// }
