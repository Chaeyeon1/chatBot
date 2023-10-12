import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

export async function POST(request: Request) {
  const res = await request.json();

  const { id } = res;

  const deletedUser = await client.user.delete({
    where: { id: Number(id) },
  });

  return NextResponse.json(deletedUser);
}
