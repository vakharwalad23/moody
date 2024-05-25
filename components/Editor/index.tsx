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
  };
};

const Editor = (props: Props) => {
  const [value, setValue] = React.useState(props.entry.content);
  const [isLoading, setIsLoading] = React.useState(false);
  useAutosave({
    data: value,
    onSave: async (_val) => {
      setIsLoading(true);
      const updatedEntry = await updateEntry(props.entry.id, _val);
      setIsLoading(false);
    },
  });

  return (
    <div className="w-full h-full">
      {isLoading && <div>Loading...</div>}
      <textarea
        className="w-full h-full p-8 text-xl outline-none"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};

export default Editor;
