import { prisma } from "@/utils/db";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const createUser = async () => {
  const user = await currentUser();
  console.log(user);
  const match = await prisma.user.findUnique({
    where: { clerkId: user?.id as string },
  });
  if (!match) {
    const newUser = await prisma.user.create({
      data: {
        clerkId: user?.id as string,
        email: user?.emailAddresses[0].emailAddress as string,
      },
    });
  }
  redirect("/journal");
};

type Props = {};
async function NewUser({}: Props) {
  await createUser();
}

export default NewUser;
