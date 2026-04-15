import Link from "next/link";
import Loader from "./loader";

// working code
export default function MasonryGrid({ pins, loading }) {
  return (
    <div className="columns-2 sm:columns-3 md:columns-4 lg:columns-5 gap-2 space-y-4">
      {pins.map((pin) => (
        <div key={pin._id} className="break-inside-avoid">

          <Link href={`/pin/${pin._id}`}>

            <img
              src={pin.image}
              alt={pin.title}
              className="rounded-xl w-full object-cover mb-2 cursor-pointer transition-transform duration-300 hover:scale-105"
              style={{ padding: "2% 3%" }}
            />

          </Link>

          <h3 className="text-sm font-semibold text-white" style={{ margin: " 2.5% 4%" }}>
            {pin.title}
          </h3>

          {/* Loading Skeleton */}
          {/* {loading &&
            Array.from({ length: 10 }).map((_, i) => (
              <Loader key={i} />
            ))
          } */}

        </div>
      ))}
    </div>
  );
}



// import Link from "next/link";
// import PinSkeleton from "./PinSkeleton";
// import Loader from "./loader";

// export default function MasonryGrid({ pins, loading }) {

//   return (
//     <div className="columns-2 sm:columns-3 md:columns-4 lg:columns-5 gap-2 space-y-4">

//       {pins.map((pin) => (
//         <div key={pin._id} className="break-inside-avoid">

//           <Link href={`/pin/${pin._id}`}>
//             <img
//               src={pin.image}
//               alt={pin.title}
//               className="rounded-xl w-full object-cover mb-2 cursor-pointer transition-transform duration-300 hover:scale-105"
//               style={{ padding: "2% 3%" }}
//             />
//           </Link>

//           <h3 className="text-sm font-semibold text-white" style={{ margin: "2.5% 4%" }}>
//             {pin.title}
//           </h3>

//         </div>
//       ))}

//       {/* Loading Skeleton */}
//       {loading &&
//         Array.from({ length: 10 }).map((_, i) => (
//           <Loader key={i} />
//         ))
//       }

//     </div>
//   );
// }



// export default function MasonryGrid({ pins, onImageLoad }) {
//   return (
//     <div className="columns-2 sm:columns-3 md:columns-4 lg:columns-5 gap-2 space-y-4">

//       {pins.map((pin) => (
//         <div key={pin._id} className="break-inside-avoid">

//           <Link href={`/pin/${pin._id}`}>
//             <img
//               src={pin.image}
//               alt={pin.title}
//               onLoad={onImageLoad}
//               className="rounded-xl w-full object-cover mb-2"
//             />
//           </Link>

//           <h3 className="text-sm text-white px-2">
//             {pin.title}
//           </h3>

//         </div>
//       ))}

//     </div>
//   );
// }






