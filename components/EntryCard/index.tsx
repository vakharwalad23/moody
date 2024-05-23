import React from "react";

type Props = {
  entry: {
    Analysis: {
      id: string;
      entryId: string;
      mood: string;
      summary: string;
      color: string;
      negative: boolean;
      createdAt: Date;
      updatedAt: Date;
    } | null;
  } & {
    id: string;
    content: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
  };
};

const EntryCard = (props: Props) => {
  const date = new Date(props.entry.createdAt).toDateString();
  return (
    <div className="divide-y divide-gray-800/12 overflow-hidden rounded-lg bg-white transition-all duration-300 hover:shadow-lg hover:scale-105 shadow-lg">
      <div className="px-4 py-5 sm:px-6">{date}</div>
      <div className="px-4 py-5 sm:p-6">{props.entry.Analysis?.summary}</div>
      <div className="px-4 py-4 sm:px-6">{props.entry.Analysis?.mood}</div>
    </div>
  );
};

export default EntryCard;
