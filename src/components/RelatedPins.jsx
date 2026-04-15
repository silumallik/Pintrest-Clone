"use client";

import useInfiniteScroll from "@/lib/hooks/useInfiniteScroll";
import MasonryGrid from "@/components/MasonryGrid";

export default function RelatedPins({ currentPinId }) {

  const fetchRelatedPins = async (page) => {
    try {
      const res = await fetch(
        `/api/pins?exclude=${currentPinId}&page=${page}`,
        { cache: "no-store" }
      );

      if (!res.ok) return [];

      const data = await res.json();
      return Array.isArray(data) ? data : [];

    } catch (error) {
      console.error(error);
      return [];
    }
  };

  const { data: pins, loader, } = useInfiniteScroll(fetchRelatedPins);

  return (
    <div className="mt-16 px-4">

      <h2 className="text-white text-2xl font-bold mb-6">
        More like this
      </h2>

      <MasonryGrid pins={pins} />

      {/* {loading && (
        <div className="flex justify-center py-6">
          <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      )} */}

      <div ref={loader} className="h-10" />

    </div>
  );
}