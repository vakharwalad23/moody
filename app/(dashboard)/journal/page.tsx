import React from "react";
import { prisma } from "@/utils/db";
import { getUserByClerkId } from "@/utils/auth";

type Props = {};

const getEntries = async () => {
  const user = await getUserByClerkId();
  const journalEntries = await prisma.journalEntry.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return journalEntries;
};

async function JournalPage({}: Props) {
  const journalEntries = await getEntries();
  return <div>JournalPage</div>;
}

export default JournalPage;
