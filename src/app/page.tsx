import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowLeftCircle, ArrowUpCircle } from "lucide-react";

export default function Home() {
  return (
    <main className="flex space-x-2 items-center animate-pulse">
      <ArrowLeftCircle className="w-8 h-8" />
      <h1 className="font-bold">
        Get started with creating your first Document
      </h1>
    </main>
  );
}
