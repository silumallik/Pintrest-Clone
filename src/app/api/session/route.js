import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export async function GET(req) {
  const session = await getServerSession(authOptions);
  console.log(session);
  
  return new Response(JSON.stringify({ session }));
}