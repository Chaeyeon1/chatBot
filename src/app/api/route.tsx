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

  return NextResponse.json(frontMemosWithCommentCount);
}

export async function POST(request: Request) {
  const res = await request.json();
  const offset = 1000 * 60 * 60 * 9;
  const koreaNow = new Date(new Date().getTime() + offset);

  const { content, writer } = res;

  const newUser = await client.frontMemo.create({
    data: {
      content: content ?? "",
      writer: writer ?? "",
      createdAt: koreaNow,
    },
  });

  return NextResponse.json(newUser);
}
