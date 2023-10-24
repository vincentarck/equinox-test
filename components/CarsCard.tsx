import React from "react";
import { Car } from "@prisma/client";
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Image from "next/image";

interface CarsCardProps {
  car: Car;
}
export default function CarCard({ car }: CarsCardProps) {
  const {car_name, day_rate, image_url, month_rate} = car
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
          <div>
            <Image src={image_url} width={120} height={120} className="w-20 h-20" alt={`${car_name}_image`}/>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Cancel</Button>
          <Button>Deploy</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
