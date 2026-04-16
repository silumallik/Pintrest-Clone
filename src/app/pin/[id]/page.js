// "use client"
import { notFound } from "next/navigation";
import Image from "next/image";
import LikeButton from "@/components/LikeButton";
import SaveButton from "@/components/SaveButton";
import CommentSection from "@/components/CommentSection";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import Link from "next/link";
import RelatedPins from "@/components/RelatedPins";
import CommentButton from "@/components/CommentButton";
import DeletePinButton from "@/components/DeletePinButton";
import PinMenu from "@/components/PinMenu";



async function getPin(id) {
  // const res = await fetch(`http://localhost:3000/api/pins/${id}`, {
    const res = await fetch(`${process.env.NEXTAUTH_URL || ""}/api/pins/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) return null;
  return res.json();
}

export default async function PinPage({ params }) {

  const { id } = await params;

  if (!id) return notFound();

  const session = await getServerSession(authOptions);

  const pin = await getPin(id);

  if (!pin) return notFound();

  // const isOwner = session?.user?.id === pin.user;
  const isOwner = session?.user?.id === pin.owner?._id?.toString();

  {/* Full Img System */ }
  return (
    <div className="min-h-screen bg-black text-white px-4 sm:px-6 md:px-10 py-6 sm:py-10">

      <div className="max-w-5.5xl mx-auto bg-[#1a1a1a] rounded-xl shadow-xl overflow-hidden p-4 sm:p-6">

        {/* IMAGE */}
        <div className="w-full">
          <Image
            src={pin.image}
            alt={pin.title}
            width={800}
            height={1000}
            className="rounded-xl object-cover w-full h-auto"
          />
        </div>

        {/* Related Container Pin Acations */}
        <div className="flex justify-between items-center mt-4">

          {/* PROFILE */}
          {pin.owner && (
            <Link href={`/profile/${pin.owner._id}`}>
              <div className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition mt-4"
                style={{ padding: "5px 10px" }}
              >

                <img
                  src={pin.owner.image || "/default-avatar.png"}
                  alt={pin.owner.name}
                  className="w-10 h-10 rounded-full object-cover"
                />

                <span className="font-semibold">
                  {pin.owner.name}
                </span>

              </div>
            </Link>
          )}

          {/* ACTION BUTTONS */}
          <div className="flex justify-between items-center mt-4"
            style={{ padding: "5px 15px" }}>

            <div className="flex gap-2 ">
              <LikeButton
                pinId={pin._id}
                initialLikes={pin.likes?.length || 0}
              />

              <SaveButton
                pinId={pin._id}
                initialSaved={pin.isSaved}
              />

              <CommentButton
                pinId={pin._id}
                comments={pin.comments || []}
                pinOwner={pin.owner}
              />

              {/* Desktop / Tablet Delete Button */}
              {isOwner && (
                <div className="hidden md:block">
                  <DeletePinButton pinId={pin._id} />
                </div>
              )}

              {/* Mobile 3 Dot Menu */}
              {isOwner && (
                <div className="block md:hidden">
                  <PinMenu pinId={pin._id} isOwner={isOwner} />
                </div>
              )}

            </div>

          </div>

        </div>

      </div>

      <div className="mt-10">
        <RelatedPins currentPinId={pin._id} />
      </div>

    </div>
  );


  {/* Left IMG Right Content */ }
  // return (
  //   <div className="min-h-screen bg-black text-white px-4 md:px-10 py-10">

  //     {/* MAIN CARD */}
  //     <div className="max-w-6xl mx-auto bg-[#1a1a1a] rounded-2xl overflow-hidden shadow-xl">

  //       <div className="grid md:grid-cols-2">

  //         {/* IMAGE */}
  //         <div className="w-full">
  //           <Image
  //             src={pin.image}
  //             alt={pin.title}
  //             width={800}
  //             height={1000}
  //             className="w-full h-full object-cover"
  //           />
  //         </div>

  //         {/* RIGHT SIDE CONTENT */}
  //         <div className="p-6 flex flex-col justify-between">

  //           <div>

  //             {/* ACTION BUTTONS */}
  //             <div className="flex gap-6 mb-6">

  //               <LikeButton
  //                 pinId={pin._id}
  //                 initialLikes={pin.likes?.length || 0}
  //               />

  //               <SaveButton
  //                 pinId={pin._id}
  //                 initialSaved={pin.isSaved}
  //               />

  //               <CommentButton
  //                 pinId={pin._id}
  //                 comments={pin.comments || []}
  //                 pinOwner={pin.owner}
  //               />

  //             </div>

  //             {/* TITLE */}
  //             <h1 className="text-2xl font-bold mb-3">
  //               {pin.title}
  //             </h1>

  //             {/* DESCRIPTION */}
  //             <p className="text-gray-400">
  //               {pin.description}
  //             </p>

  //           </div>

  //           {/* OWNER PROFILE */}
  //           {pin.owner && (
  //             <Link href={`/profile/${pin.owner._id}`}>
  //               <div className="flex items-center gap-3 mt-8 cursor-pointer hover:opacity-80">

  //                 <img
  //                   src={pin.owner.image || "/default-avatar.png"}
  //                   className="w-10 h-10 rounded-full object-cover"
  //                 />

  //                 <span className="font-semibold">
  //                   {pin.owner.name}
  //                 </span>

  //               </div>
  //             </Link>
  //           )}

  //         </div>

  //       </div>

  //     </div>

  //     {/* RELATED PINS */}
  //     <div className="mt-16">
  //       <RelatedPins currentPinId={pin._id} />
  //     </div>

  //   </div>
  // );


}
