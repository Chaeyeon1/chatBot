import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

export async function GET() {
  const allUsers = await client.frontMemo.findMany();

  return NextResponse.json(allUsers);
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
// export async function POST(request: Request) {
//   const res = await request.json();
//   const offset = 1000 * 60 * 60 * 9;
//   const koreaNow = new Date(new Date().getTime() + offset);

//   const { money } = res;

//   const newUser = await client.stock.create({
//     data: {
//       money: money ?? 0,
//       date: koreaNow,
//     },
//   });

//   return NextResponse.json(newUser);
// }
