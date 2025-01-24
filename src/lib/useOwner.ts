import { useEffect, useState } from "react"
import { db } from "../../firebase"
import { useUser } from "@clerk/nextjs";
import { auth, EmailAddress } from "@clerk/nextjs/server";
import { useCollection } from "react-firebase-hooks/firestore";
import { collectionGroup, query, where } from "firebase/firestore";
import { useRoom } from "@liveblocks/react/suspense";
const useOwner = () => {
   const [isOwner, setIsOwner] = useState<boolean>(false);
   const {user} = useUser();
   const {id} = useRoom();
   const q = query(collectionGroup(db, "rooms"), where("roomId", "==", id));
   const [roomDocs] = useCollection(q);
   useEffect(() => {

      const ownedDocs = roomDocs?.docs.filter(doc => doc.data().role === "owner");
      if (ownedDocs && ownedDocs.length > 0) {
         setIsOwner(ownedDocs.some(doc => doc.data().userId === user?.emailAddresses[0].toString()));
      }
   }, [roomDocs, user]);
 return isOwner;
}
export default useOwner