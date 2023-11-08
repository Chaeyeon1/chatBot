import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

export async function GET() {
  const allFrontMemos = await client.frontMemo.findMany();

  const frontMemosWithCommentCount = await Promise.all(
    allFrontMemos.map(async (frontMemo) => {
      const commentCount = await client.frontMemoComment.count({
        where: {
          memoId: frontMemo.id,
        },
      });

      return {
        ...frontMemo,
        commentCount,
      };
    })
  );

  frontMemosWithCommentCount.sort((a, b) => {
    const createdAtA = a.createdAt;
    const createdAtB = b.createdAt;
    const idA = a.id;
    const idB = b.id;

    if (createdAtB > createdAtA) {
      return 1;
    } else if (createdAtA > createdAtB) {
      return -1;
    } else {
      return idA - idB;
    }
  });

  return NextResponse.json(frontMemosWithCommentCount);
}

export async function POST(request: Request) {
  const res = await request.json();

  const { content, writer, date } = res;

  const createdAt = new Date(date);

  const newUser = await client.frontMemo.create({
    data: {
      content: content ?? "",
      writer: writer ?? "",
      createdAt,
    },
  });

  return NextResponse.json(newUser);
}
