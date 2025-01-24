import { auth } from "@clerk/nextjs/server";
import {NextRequest} from "next/server";
import { adminDb } from "../../../firebase-admin";
import liveblocks from "@/lib/liveblocks";

export const POST = async (req: NextRequest) => {
  console.log("entered")
  const {sessionClaims} = await auth();
  const {room} = await req.json();

const session = liveblocks.prepareSession(sessionClaims?.email!, {userInfo: {
  name: sessionClaims?.fullName!,
  email: sessionClaims?.email!,
  avatar: sessionClaims?.image!,
}});



const allowedDocs = await adminDb.collectionGroup("rooms").where("userId", "==", sessionClaims?.email).get();
const isCurrentUserAllowed = allowedDocs.docs.some((doc) => doc.id === room);
if (isCurrentUserAllowed) {
  session.allow(room, session.FULL_ACCESS);

const { body, status } = await session.authorize();
return new Response(body, { status });
} else {
  return new Response("Unauthorized", { status: 403 });
}
}