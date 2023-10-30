import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

export async function GET(request: NextRequest) {
  const url = new URL(request.url);

  const id = url.searchParams.get("id");

  const allMemos = await client.frontMemoComment.findMany({
    where: {
      memoId: Number(id) ?? 0,
    },
  });

  return NextResponse.json(allMemos);
}

export async function POST(request: Request) {
  const res = await request.json();
  const offset = 1000 * 60 * 60 * 9;
  const koreaNow = new Date(new Date().getTime() + offset);

  const { id, content, writer } = res;

  const postComment = await client.frontMemoComment.create({
    data: {
      memoId: Number(id),
      content: content ?? "",
      createdAt: koreaNow,
      writer,
    },
  });

  return NextResponse.json(postComment);
}

export const DELETE = async (request: Request) => {
  const url = new URL(request.url);

  const id = url.searchParams.get("id");

  const deletedUser = await client.frontMemoComment.delete({
    where: { id: Number(id) },
  });

  return NextResponse.json(deletedUser);
};
