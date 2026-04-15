"use client";

import { useEffect, useState, useRef, useCallback } from "react";

export default function useInfiniteScroll(fetchFunction) {

  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const loader = useRef(null);

  const loadingRef = useRef(false); // ⭐ important

  const loadMore = useCallback(async () => {

    setLoading(true);

    const newData = await fetchFunction(page);

    if (!Array.isArray(newData)) {
      setLoading(false);
      return;
    }

    // ✅ REMOVE DUPLICATES
    setData((prev) => {

      const map = new Map();

      [...prev, ...newData].forEach((item) => {
        map.set(item._id, item);
      });

      return Array.from(map.values());
    });

    setLoading(false);

  }, [page, fetchFunction]);

  useEffect(() => {
    loadMore();
  }, [page]);

  useEffect(() => {

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          setPage((prev) => prev + 1);
        }
      },
      // { threshold: 1 }
      { threshold: 0.5 } // ⭐ important
    );

    if (loader.current) observer.observe(loader.current);

    return () => observer.disconnect();

  }, [loading]);

  return { data, loading, loader };
}





// export default function useInfiniteScroll(fetchFunction) {

//   const [data, setData] = useState([]);
//   const [page, setPage] = useState(1);
//   const [loading, setLoading] = useState(false);
//   const [hasMore, setHasMore] = useState(true);

//   const loader = useRef(null);

//   const loadMore = useCallback(async () => {

//     if (loading || !hasMore) return;

//     setLoading(true);

//     const newData = await fetchFunction(page);

//     if (!newData || newData.length === 0) {
//       setHasMore(false); // 🔴 stop loading
//       setLoading(false);
//       return;
//     }

//     setData((prev) => [...prev, ...newData]);

//     setLoading(false);

//   }, [page, fetchFunction, loading, hasMore]);

//   useEffect(() => {
//     loadMore();
//   }, [page]);

//   useEffect(() => {

//     const observer = new IntersectionObserver((entries) => {

//       if (entries[0].isIntersecting && !loading && hasMore) {
//         setPage((prev) => prev + 1);
//       }

//     });

//     if (loader.current) observer.observe(loader.current);

//     return () => observer.disconnect();

//   }, [loading, hasMore]);

//   return { data, loading, loader };
// }

