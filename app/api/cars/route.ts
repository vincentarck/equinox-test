import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
) {
  try {
    const server = await db.car.findMany()

    return NextResponse.json(server);
  } catch (error) {
    console.log("[CARS_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

