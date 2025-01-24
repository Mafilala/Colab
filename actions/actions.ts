"use server";

import { auth } from "@clerk/nextjs/server";
import { adminDb } from "../firebase-admin";
import { doc } from "firebase/firestore";

export const createNewDocument = async () => {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized access");
  }
  const { sessionClaims } = await auth();
  const docCollectionRef = adminDb.collection("documents");
  const newDocRef = await docCollectionRef.add({
    title: "New Document",
  });
  await adminDb
    .collection("users")
    .doc(sessionClaims?.email!)
    .collection("rooms")
    .doc(newDocRef.id)
    .set({
      userId: sessionClaims?.email!,
      role: "owner",
      createdAt: new Date(),
      roomId: newDocRef.id,
    });
  return { docId: newDocRef.id };
};
