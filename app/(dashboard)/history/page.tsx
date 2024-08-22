import HistoryChart from "@/components/HistoryChart";
import { getUserByClerkId } from "@/utils/auth";
import { prisma } from "@/utils/db";
import React from "react";
import { User } from "@/utils/definitions";

type Props = {};

const getData = async () => {
  const user = (await getUserByClerkId()) as User;
  const analysis = await prisma.analysis.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  const sum = analysis.reduce((prev, curr) => prev + curr.sentimentScore, 0);
  const average = Math.round(sum / analysis.length);

  return { analysis, average };
};

async function History({}: Props) {
  const data = await getData();

  return (
    <div className="w-full h-full flex flex-col px-3 py-2 bg-gray-400/5">
      <div className="text-lg font-semibold mb-4">{`Average Sentiment ${data.average}`}</div>
      <div className="flex-1">
        <HistoryChart data={data} />
      </div>
    </div>
  );
}

export default History;
