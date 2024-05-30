import React from "react";

type Props = {
  entry: {
    Analysis: {
      id: string;
      entryId: string;
      mood: string;
      summary: string;
      subject: string;
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
    <div className="overflow-hidden rounded-lg bg-white transition-all duration-300 hover:shadow-lg hover:scale-105 shadow-lg">
      <div className="px-4 py-5 text-slate-500">{date}</div>
      <div className="px-4 py-2 text-lg font-medium">
        {props.entry.Analysis?.subject}
      </div>
      <div className="px-4 py-3">{props.entry.Analysis?.summary}</div>
      <div className="px-4 py-4">{props.entry.Analysis?.mood}</div>
    </div>
  );
};

export default EntryCard;
