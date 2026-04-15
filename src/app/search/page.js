"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";

export default function SearchPage() {
    const [query, setQuery] = useState("");
    const [pins, setPins] = useState([]);
    const [trending, setTrending] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    const loaderRef = useRef(null);
    const debounceRef = useRef(null);

    // Fetch Trending
    useEffect(() => {
        fetch("/api/pins/trending")
            .then(res => res.json())
            .then(data => setTrending(data));
    }, []);

    // Debounced Search
    useEffect(() => {
        if (debounceRef.current) clearTimeout(debounceRef.current);

        debounceRef.current = setTimeout(() => {
            if (!query.trim()) {
                setPins([]);
                return;
            }

            setPage(1);
            fetch(`/api/pins/search?q=${query}&page=1`)
                .then(res => res.json())
                .then(data => {
                    setPins(data);
                    setHasMore(data.length > 0);
                });
        }, 500);

    }, [query]);

    // Infinite Scroll
    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => {
                if (entries[0].isIntersecting && hasMore) {
                    const nextPage = page + 1;
                    fetch(`/api/pins/search?q=${query}&page=${nextPage}`)
                        .then(res => res.json())
                        .then(data => {
                            if (data.length === 0) {
                                setHasMore(false);
                            } else {
                                setPins(prev => [...prev, ...data]);
                                setPage(nextPage);
                            }
                        });
                }
            },
            { threshold: 1 }
        );

        if (loaderRef.current) {
            observer.observe(loaderRef.current);
        }

        return () => observer.disconnect();
    }, [page, query, hasMore]);

    // return (
    //     <div className="min-h-screen bg-black text-white p-6" style={{padding:"0 1%"}}>
    //         <div className="max-w-6xl mx-auto" >

    //             {/* Search Input */}
    //             <input
    //                 type="text"
    //                 placeholder="Search ideas..."
    //                 value={query}
    //                 onChange={(e) => setQuery(e.target.value)}
    //                 className="w-100 h-10 px-5 py-3 rounded-full bg-[#1a1a1a] border border-gray-700 focus:ring-2 focus:ring-red-500 outline-none mb-8"
    //                 style={{margin:"2% 3%", padding:"0% 2%"}}
    //             />

    //             {/* Trending Suggestions */}
    //             {!query && (
    //                 <>
    //                     <h2 className="text-xl mb-6 font-semibold">Trending 🔥</h2>

    //                     <div className="columns-2 sm:columns-2 md:columns-3 lg:columns-4 gap-4">
    //                         {trending.map(pin => (
    //                             <Link key={pin._id} href={`/pin/${pin._id}`}>
    //                                 <div className="mb-4 break-inside-avoid cursor-pointer">
    //                                     <img
    //                                         src={pin.image}
    //                                         alt={pin.title}
    //                                         className="w-full rounded-xl object-cover"
    //                                     />
    //                                     <p className="text-sm text-gray-300 mt-2">
    //                                         {pin.title}
    //                                     </p>
    //                                 </div>
    //                             </Link>
    //                         ))}
    //                     </div>
    //                 </>
    //             )}

    //             {/* Results */}
    //             {query && (
    //                 <div className="columns-2 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-4">
    //                     {pins.map(pin => (
    //                         <Link key={pin._id} href={`/pin/${pin._id}`}>
    //                             <div className="mb-4 break-inside-avoid">
    //                                 <img
    //                                     src={pin.image}
    //                                     alt={pin.title}
    //                                     className="w-full rounded-xl object-cover"
    //                                 />
    //                                 <p className="text-sm text-gray-300 mt-2">
    //                                     {pin.title}
    //                                 </p>
    //                             </div>
    //                         </Link>
    //                     ))}
    //                 </div>
    //             )}

    //             {/* Infinite Scroll Loader */}
    //             <div ref={loaderRef} className="h-10"></div>

    //         </div>
    //     </div>
    // );

    return (
  <div className="min-h-screen bg-black text-white px-3 sm:px-6 lg:px-8 py-6" style={{padding:"0 2%"}}>
    <div className="max-w-7xl mx-auto">

      {/* Search Input */}
      <div className="mb-8" style={{padding:"3% 2%"}}>
        <input
          type="text"
          placeholder="Search ideas..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{padding:"0% 2%"}}
          className="w-full h-11 sm:h-12 px-5 rounded-full bg-[#1a1a1a] border border-gray-700 focus:ring-2 focus:ring-red-500 outline-none"
        />
      </div>

      {/* Trending Suggestions */}
      {!query && (
        <>
          <h2 className="text-lg sm:text-xl font-semibold mb-6">
            Trending 🔥
          </h2>

          <div className="columns-2 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-4">
            {trending.map(pin => (
              <Link key={pin._id} href={`/pin/${pin._id}`}>
                <div className="mb-4 break-inside-avoid cursor-pointer">
                  <img
                    src={pin.image}
                    alt={pin.title}
                    className="w-full rounded-xl object-cover transition-transform duration-300 hover:scale-105"
                  />
                  <p className="text-sm text-gray-300 mt-2" style={{margin:"4% 2%"}}>
                    {pin.title}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </>
      )}

      {/* Results */}
      {query && (
        <div className="columns-2 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-4">
          {pins.map(pin => (
            <Link key={pin._id} href={`/pin/${pin._id}`}>
              <div className="mb-4 break-inside-avoid cursor-pointer">
                <img
                  src={pin.image}
                  alt={pin.title}
                  className="w-full rounded-xl object-cover transition-transform duration-300 hover:scale-105"
                />
                <p className="text-sm text-gray-300 mt-2" style={{margin:"4% 2%"}}>
                  {pin.title}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Infinite Scroll Loader */}
      <div ref={loaderRef} className="h-10"></div>

    </div>
  </div>
);

}