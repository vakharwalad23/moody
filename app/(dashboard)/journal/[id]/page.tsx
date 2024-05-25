import React from "react";
import Editor from "@/components/Editor";
import { getUserByClerkId } from "@/utils/auth";
import { prisma } from "@/utils/db";

const getEntry = async (id: string) => {
  const user = await getUserByClerkId();
  const entry = await prisma.journalEntry.findUnique({
    where: { userId_id: { userId: user.id, id } },
  });
  return entry;
};

async function EditorPage({ params }: { params: { id: string } }) {
  const entry = await getEntry(params.id);
  const analysis = [
    { name: "Subject", value: "" },
    { name: "Summary", value: "" },
    { name: "Mood", value: "" },
    { name: "Negative", value: "False" },
  ];

  if (!entry) {
    return <div>Entry not found</div>;
  }

  return (
    <div className="w-full h-full grid grid-cols-3 gap-8 p-8">
      <div className="col-span-2">
        <Editor entry={entry} />
      </div>
      <div className="border rounded-lg shadow-md min-h-[500px] max-h-[700px]">
        <div className="bg-sky-500 text-white px-6 py-4 rounded-t-lg">
          <h2 className="text-2xl font-bold">Analysis</h2>
        </div>
        <div className="p-4">
          <ul>
            {analysis.map((item) => (
              <li
                key={item.name}
                className="flex items-center justify-between px-2 py-4 border-b border-gray-800/12 last:border-none"
              >
                <span className="text-lg font-semibold">{item.name}</span>
                <span className="flex items-center">{item.value}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default EditorPage;
