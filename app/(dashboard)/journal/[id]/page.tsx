import React from "react";
import Editor from "@/components/Editor";
import { getUserByClerkId } from "@/utils/auth";
import { prisma } from "@/utils/db";

const getEntry = async (id: string) => {
  const user = await getUserByClerkId();
  const entry = await prisma.journalEntry.findUnique({
    where: { userId_id: { userId: user.id, id } },
    include: {
      Analysis: true,
    },
  });
  return entry;
};

async function EditorPage({ params }: { params: { id: string } }) {
  const entry = await getEntry(params.id);
  if (!entry) {
    return <div>Entry not found</div>;
  }

  return (
    <div className="w-full h-full">
      <Editor entry={entry} />
    </div>
  );
}

export default EditorPage;
