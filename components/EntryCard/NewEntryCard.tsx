"use client";

import { createNewEntry } from "@/utils/api";
import React from "react";
import { useRouter } from "next/navigation";

type Props = {};

const NewEntryCard = (props: Props) => {
  const router = useRouter();

  const handleClick = async () => {
    const data = await createNewEntry();
    router.push(`/journal/${data.id}`);
  };
  return (
    <div className="cursor-pointer overflow-hidden rounded-lg bg-white shadow-lg">
      <div className="px-4 py-5 sm:p-6" onClick={handleClick}>
        <span className="text-2xl">New Entry</span>
      </div>
    </div>
  );
};

export default NewEntryCard;
