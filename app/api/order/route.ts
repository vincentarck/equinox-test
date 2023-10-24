import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
) {
  try {
   
    const totalOrder = await db.order.findMany({
      include:{
        car:true
      }
    })

    return NextResponse.json(totalOrder);
  } catch (error) {
    console.log("[ORDER_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function POST(
  req: Request,
  { params }: { params: { carId: string } }
) {
  try {
    const { car_id, order_date, pickup_date, pickup_location, dropoff_location, dropoff_date } = await req.json();
    const carId = car_id
    const orderDate = order_date
    const pickupDate = pickup_date
    const dropOffDate = dropoff_date
    const pickupLocation = pickup_location
    const dropoffLocation = dropoff_location

    if (!carId) {
      return new NextResponse("Car ID missing", { status: 400 });
    }
    if (!pickupDate) {
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


