"use client";
import React from "react";
import { Car } from "@prisma/client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { useModal } from "@/hooks/useModalStore";
import { db } from "@/lib/db";
import axios from "axios";
import { useRouter } from "next/navigation";

interface CarsCardProps {
  car: Car;
}
export default function CarCard({ car }: CarsCardProps) {
  const { onOpen } = useModal();
  const { car_name, day_rate, image_url, month_rate, id } = car;
  const router = useRouter()
  const handleDeleteCar = async ()  => await axios.delete(`/api/cars/${id}`).then(() => router.refresh())
  return (
    <div className="aspect-ratio aspect-w-1 aspect-h-1">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>{car_name}</CardTitle>
          <CardDescription>
            Rent {car_name} right now with 85% off
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-y-3 font-bold text-sm">
            <Image
              src={image_url}
              width={120}
              height={120}
              className="w-full h-48 object-cover"
              alt={`${car_name}_image`}
            />
            <p>Day Rate: Rp: {day_rate}</p>
            <p>Monthly Rate: Rp: {month_rate}</p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => onOpen("editCar", {car})}>Update</Button>
          <Button variant="destructive" onClick={handleDeleteCar} >Delete Cars</Button>
          <Button onClick={() => onOpen("makeOrder", {car})} >Book Now!</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
