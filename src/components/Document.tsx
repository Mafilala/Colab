"use client";

import { useState, useTransition } from "react";
import { Input } from "./ui/input";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { Button } from "./ui/button";
import { useDocumentData } from "react-firebase-hooks/firestore";
import Editor from "./Editor";
import useOwner from "@/lib/useOwner";

const Document = ({ id }: { id: string }) => {
  const [input, setInput] = useState("");
  const [isupdating, startTransition] = useTransition();
  const [data, loading, error] = useDocumentData(doc(db, "documents", id));
  const isOwner = useOwner();
  const updateTitle = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      startTransition(async () => {
        await updateDoc(doc(db, "documents", id), {
          title: input,
        });
        setInput("");
      });
    }
  };
  return (
    <div className="">
      <div className=" flex justify-between mx-auto max-w-6xl ">
        <form onSubmit={updateTitle} className="flex space-x-2 flex-1 ">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="bg-white  rounded-[6px] border-none "
          />
          <Button type="submit">{`${
            isupdating ? "updating" : "Update"
          }`}</Button>

          {isOwner && (
            <DeleteDocument />
          )}

        </form>
      </div>
      <div className="mb-4">
        {/* Manage User */}

        {/* Avators */}
      </div>
      <Editor />
    </div>
  );
};
export default Document;
