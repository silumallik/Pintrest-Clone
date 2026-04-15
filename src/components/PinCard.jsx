"use client";
import "../app/home.css";
import Link from "next/link";

export default function PinCard({ pin }) {
  return (
  <Link href={`/pin/${pin._id}`}>
    <div className="pin-card" 
    style={{width:"20%", height:"8%"}}
    >
      <img 
      // style={{width:"100%",height:"8%",objectFit:"cover"}}
        src={pin.image}
        alt={pin.title}
        className="pin-image w-full rounded-xl object-cover"
      />
      <h3 className="pin-title" 
      // style={{color:"white",padding:" 0% 5%"}}
      >
        {pin.title}
      </h3>
    </div>
    </Link>
  );
}
