"use client";
import { updateEntry } from "@/utils/api";
import React from "react";
import { useAutosave } from "react-autosave";

type Props = {
  entry: {
    id: string;
    content: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
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
  };
};

const Editor = (props: Props) => {
  const [value, setValue] = React.useState(props.entry.content);
  const [isLoading, setIsLoading] = React.useState(false);
  const [analysis, setAnalysis] = React.useState(
    props.entry?.Analysis ?? {
      mood: "",
      summary: "",
      subject: "",
      negative: false,
      color: "#0101fe",
    }
  );
  const { mood, summary, subject, negative, color } = analysis;
  const analysisData = [
    { name: "Subject", value: subject },
    { name: "Summary", value: summary },
    { name: "Mood", value: mood },
    { name: "Negative", value: negative ? "True" : "False" },
  ];

  useAutosave({
    data: value,
    onSave: async (_val) => {
      setIsLoading(true);
      const data = await updateEntry(props.entry.id, _val);
      setAnalysis(data.Analysis);
      setIsLoading(false);
    },
  });

  return (
    <div className="relative w-full h-full grid grid-cols-3 gap-8 p-8">
      <div className="col-span-2">
        {isLoading && <div>Loading...</div>}
        <textarea
          className="w-full h-full p-8 text-xl outline-none rounded-lg shadow-md border border-gray-800/12 resize-none"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Start writing..."
        />
      </div>
      <div className="border rounded-lg shadow-md">
        <div
          className="text-white px-6 py-4 rounded-t-lg"
          style={{ backgroundColor: color }}
        >
          <h2 className="text-2xl font-bold">Analysis</h2>
        </div>
        <div className="p-3">
          <ul>
            {analysisData.map((item) => (
              <li
                key={item.name}
                className="flex flex-col px-2 py-4 border-b border-gray-800/12 last:border-none"
              >
                <span className="text-lg font-semibold">{item.name}</span>
                <span>{item.value}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Editor;
