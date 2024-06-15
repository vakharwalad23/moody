"use client";

import { createNewEntry } from "@/utils/api";
import React from "react";
import { useRouter } from "next/navigation";

type Props = {};

const NewEntryCard = (props: Props) => {
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();

  const handleClick = async () => {
    setLoading(true);
    const data = await createNewEntry();
    setLoading(false);
    router.push(`/journal/${data.id}`);
  };
  return (
    <div className="cursor-pointer overflow-hidden rounded-lg bg-white shadow-lg">
      <div className="px-4 py-5 sm:p-6" onClick={handleClick}>
        <span className="text-2xl">New Entry</span>
        {loading && (
          <div className="flex pt-2">
            <svg
              className="animate-spin h-5 w-5 mr-3 text-gray-500"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <span className="text-gray-500">Loading...</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewEntryCard;
