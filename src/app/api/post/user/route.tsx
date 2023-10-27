import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

export async function GET(request: NextRequest) {
  const url = new URL(request.url);

  const writer = url.searchParams.get("writer");

  const user = await client.frontMemo.findMany({
    where: {
      writer: writer ?? "",
    },
  });

  return NextResponse.json(user);
}
