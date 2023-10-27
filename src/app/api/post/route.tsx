import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

export async function GET(request: Request) {
  const url = new URL(request.url);

  const id = url.searchParams.get("id");

  const user = await client.frontMemo.findUnique({
    where: {
      id: Number(id),
    },
  });

  return NextResponse.json(user);
}
