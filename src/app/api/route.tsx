// import { NextResponse } from "next/server";
// import { PrismaClient } from "@prisma/client";

// const client = new PrismaClient();

// const CorsHeaders = {
//   "Access-Control-Allow-Origin": "*",
//   "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
//   "Access-Control-Allow-Headers": "Content-Type, Authorization",
// };

// export async function GET() {
//   await client.user.findMany();

//   return new NextResponse(null, {
//     status: 200,
//     headers: {
//       "Access-Control-Allow-Origin": "*",
//       "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
//       "Access-Control-Allow-Headers": "Content-Type, Authorization",
//     },
//   });
// }

// // export async function POST() {
// //   const res = await fetch("https://data.mongodb-api.com/...", {
// //     method: "POST",
// //     headers: CorsHeaders,
// //     body: JSON.stringify({ time: new Date().toISOString() }),
// //   });

// //   const data = await res.json();

// //   return NextResponse.json(data);
// // }

// export async function POST(request: Request) {
//   const res = await request.json();
//   const offset = 1000 * 60 * 60 * 9;
//   const koreaNow = new Date(new Date().getTime() + offset);

//   const { money } = res;

//   const newUser = await client.user.create({
//     data: {
//       money: money ?? 0,
//       date: koreaNow,
//     },
//   });

//   return NextResponse.json(newUser);
// }

import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

export async function GET() {
  console.log("asdfasdf");
  const allUsers = await client.user.findMany();

  return NextResponse.json(allUsers);
}

export async function POST(request: Request) {
  const res = await request.json();
  const offset = 1000 * 60 * 60 * 9;
  const koreaNow = new Date(new Date().getTime() + offset);

  const { money } = res;

  const newUser = await client.user.create({
    data: {
      money: money ?? 0,
      date: koreaNow,
    },
  });

  return NextResponse.json(newUser);
}

export async function Delete(request: Request) {
  // const deletedUser = await client.user.delete({
  //   where: { id: Number(id) },
  // });

  return NextResponse.json({ request });
}
