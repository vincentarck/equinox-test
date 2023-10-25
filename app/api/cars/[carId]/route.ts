import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { carId: string } }
) {
  try {
    const { car_name, day_rate, image_url, month_rate } = await req.json();

    if(!car_name){
      return new NextResponse("Car name missing", {status: 401});
    }
    if(!day_rate){
      return new NextResponse("Day rate missing", {status: 401});
    }
    if(!image_url){
      return new NextResponse("Image url missing", { status: 401 });
    }
    if(!month_rate){
      return new NextResponse("Month rate missing", { status: 401 });
    }
    
    const updatedCar = await db.car.update({
      where: {
        id: Number(params.carId),
      },
      data: {
        car_name,
        day_rate,
        image_url,
        month_rate,
      }
    });

    return NextResponse.json(updatedCar);
  } catch (error) {
    console.log("[SERVER_ID_PATCH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { carId: string } }
) {
  try {
    const deletedCar = await db.car.delete({
      where: {
        id: Number(params.carId),
      },
    });

    return NextResponse.json(deletedCar);
  } catch (error) {
    console.log("[CARID_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}