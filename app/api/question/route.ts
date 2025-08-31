import { getUserByClerkId } from "@/utils/auth";
import { prisma } from "@/utils/db";
import { QA } from "@/utils/ai";
import { NextResponse } from "next/server";
import { User } from "@/utils/definitions";

export const POST = async (request: Request) => {
  const { question }: { question: string } = await request.json();
  const user = (await getUserByClerkId()) as User;

  const answer = await QA(question, user.id);

  return NextResponse.json({ data: answer });
};
