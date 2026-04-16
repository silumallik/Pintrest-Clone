"use client";

import useInfiniteScroll from "@/lib/hooks/useInfiniteScroll";
import MasonryGrid from "@/components/MasonryGrid";
import Loader from "@/components/loader";
import Loading from "./loading";


export default function HomePage() {

  const fetchPins = async (page) => {
    try {

      const res = await fetch(`/api/pins?page=${page}`, {
        cache: "no-store",
      });

      if (!res.ok) return [];

      const data = await res.json();
      return Array.isArray(data) ? data : [];

    } catch (error) {
      console.error(error);
      return [];
    }
  };

  const { data: pins, loader, loading } = useInfiniteScroll(fetchPins);

  return (
    <div className="bg-black min-h-screen p-4" style={{ padding: "1%" }}>



      {/* Masonry Layout */}
      <MasonryGrid pins={pins} loading={loading}/>

      {/* Loader animation */}
      {/* {loading && <Loading />} */}

      {/* Infinite Scroll Trigger */}
      <div ref={loader} className="h-10" />

    </div>
  );
}






