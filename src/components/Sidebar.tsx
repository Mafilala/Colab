"use client";
import { useCollection } from "react-firebase-hooks/firestore";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import NewDocumentButton from "./NewDocumentButton";
import { MenuIcon } from "lucide-react";
import { useAuth, useUser } from "@clerk/nextjs";
import {
  collectionGroup,
  query,
  where,
  orderBy,
  DocumentData,
} from "firebase/firestore";
import { db } from "../../firebase";
import { useEffect, useState } from "react";
import SidebarOptions from "./SidebarOptions";

interface RoomDocument extends DocumentData {
  createdAt: string;
  role: "owner" | "editor";
  roomId: string;
  userId: string;
}

const SideBar = () => {
  const { user } = useUser();
  const email = user?.emailAddresses?.[0]?.toString() || "";
  console.log(email);
  const [data, loading, error] = useCollection(
    user && query(collectionGroup(db, "rooms"), where("userId", "==", email))
  );
  const [groupedData, setGroupedData] = useState<{
    owner: RoomDocument[];
    editor: RoomDocument[];
  }>({
    owner: [],
    editor: [],
  });
  useEffect(() => {
    if (!data) return;
    const grouped = data.docs.reduce<{
      owner: RoomDocument[];
      editor: RoomDocument[];
    }>(
      (acc, curr) => {
        const roomData = curr.data() as RoomDocument;
        if (roomData.role === "owner") {
          acc.owner.push({
            id: curr.id,
            ...roomData,
          });
        } else {
          acc.editor.push({
            id: curr.id,
            ...roomData,
          });
        }
        return acc;
      },
      {
        owner: [],
        editor: [],
      }
    );
    setGroupedData(grouped);
  }, [data]);

  const menuOptions = (
    <>
      <NewDocumentButton />
      <div className="flex flex-col py-4 space-y-4 md:max-w-36">
        {groupedData.owner.length == 0 ? (
          <h2 className="text-gray-500 font-semibold text-sm">
            No documents found
          </h2>
        ) : (
          <>
{groupedData.owner.length > 0 && (
  <>
    <h2 className="text-gray-500 font-semibold text-sm">
      My Documents
    </h2>
    {groupedData.owner.map((doc) => (
      <SidebarOptions
        key={doc.id}
        href={`/doc/${doc.id}`}
        id={doc.id}
      />
    ))}
  </>
)}

{groupedData.editor.length > 0 && (
  <>
    <h2 className="text-gray-500 font-semibold text-sm">
      Shared with me
    </h2>
    {groupedData.editor.map((doc) => (
      <SidebarOptions
        key={doc.id}
        href={`/doc/${doc.id}`}
        id={doc.id}
      />
    ))}
  </>
)}

          </>
        )}
      </div>
    </>
  );
  return (
    <div className="p-2 md:p-5 bg-gray-200 relative">
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger>
            <MenuIcon className="p-2 hover:opacity-30" size={40} />
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
              <div>{menuOptions}</div>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>

      <div className="hidden md:inline">{menuOptions}</div>
    </div>
  );
};
export default SideBar;
