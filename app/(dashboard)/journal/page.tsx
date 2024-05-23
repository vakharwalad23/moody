import React from "react";
import { prisma } from "@/utils/db";
import { getUserByClerkId } from "@/utils/auth";
import NewEntryCard from "@/components/EntryCard/NewEntryCard";
import EntryCard from "@/components/EntryCard";

type Props = {};

const getEntries = async () => {
  const user = await getUserByClerkId();
  const journalEntries = await prisma.journalEntry.findMany({
    where: {
      userId: user.id,
    },
    include: {
      Analysis: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return journalEntries;
};

async function JournalPage({}: Props) {
  const journalEntries = await getEntries();
  return (
    <div className="p-10 bg-gray-400/5 h-full">
      <h2 className="text-3xl mb-8 font-semibold">Journal</h2>
      <div className="grid grid-cols-3 gap-4">
        <NewEntryCard />
        {journalEntries.map((entry) => (
          <EntryCard entry={entry} key={entry.id} />
        ))}
      </div>
    </div>
  );
}

export default JournalPage;
