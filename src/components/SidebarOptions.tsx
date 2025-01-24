import Link from "next/link";
import { db } from "../../firebase";
import { doc } from "firebase/firestore";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { usePathname } from "next/navigation";

const SidebarOptions = ({ href, id }: { href: string; id: string }) => {
  const docRef = doc(db, "documents", id);
  const [data, loading, error] = useDocumentData(docRef);
  const pathname = usePathname();
  const isActive = pathname.includes(href) && pathname !== "/";
  if (!data) return null;
  return (
    <Link
      href={href}
      className={`border p-2 rounded-md ${
        isActive ? "bg-gray-300 font-bold border-black" : "border-gray-400"
      }`}
    >
      <p className="truncate">{data.title}</p>
    </Link>
  );
};
export default SidebarOptions;
