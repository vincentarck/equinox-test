import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { carId: string } }
) {
  try {
    const { searchParams } = new URL(req.url);

    const carId = searchParams.get("carId");
    const orderDate = searchParams.get("order_date");
    const pickupDate = searchParams.get("pickup_date");
    const dropOffDate = searchParams.get("dropoff_date");
    const pickupLocation = searchParams.get("pickup_location");
    const dropoffLocation = searchParams.get("dropoff_location");

    if (!carId) {
      return new NextResponse("Car ID missing", { status: 400 });
    }
    if (!orderDate) {
      return new NextResponse("Order date missing", { status: 400 });
    }if (!pickupDate) {
      return new NextResponse("Pick up date missing", { status: 400 });
    }if (!dropOffDate) {
      return new NextResponse("Drop Off date missing", { status: 400 });
    }if (!pickupLocation) {
      return new NextResponse("Pick up location missing", { status: 400 });
    }if (!dropoffLocation) {
      return new NextResponse("Dropoff location missing", { status: 400 });
    }

    const createdOrder = await db.order.create({
      data:{
        car_id:Number(carId),
        dropoff_date:dropOffDate,
        dropoff_location:dropoffLocation,
        order_date:orderDate,
        pickup_date:pickupDate,
        pickup_location:pickupLocation,
      },
      include: {
        car: true
      }
    })

    return NextResponse.json(createdOrder);
  } catch (error) {
    console.log("[ORDER_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}