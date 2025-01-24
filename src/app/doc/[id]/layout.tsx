"use client";
import RoomProvider from "@/components/RoomProvider";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
const DocLayout = ({
  children,
  params: { id },
}: {
  children: React.ReactNode;
  params: { id: string };
}) => {
  const router = useRouter();
  const { userId } = useAuth();
  if (!userId) {
    router.push("/");
    return null;
  }
  return <RoomProvider roomId={id}>{children}</RoomProvider>;
};
export default DocLayout;
