"use client";
import React from "react";
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
import { Order, Car } from "@prisma/client";

interface OrderCardProps {
  order: Order & {
    car?: Car;
  };
}
export default function OrderCard({ order }: OrderCardProps) {
  const {
    dropoff_date,
    dropoff_location,
    order_date,
    pickup_location,
    pickup_date,
    car,
  } = order;
  return (
    <div className="aspect-ratio aspect-w-1 aspect-h-1">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>{car?.car_name || "Default name"}</CardTitle>
          <CardDescription>
            Here are the cars you order right now
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-y-3 font-bold text-sm">
            <p className="text-slate-400">Order Date: {order_date.toString()}</p>
            <Image
              src={car?.image_url || ""}
              width={120}
              height={120}
              className="w-full h-48 object-cover"
              alt={`${car?.car_name}_image`}
            />
            <div className="flex flex-col gap-y-2">
              <p>Pickup Location: {pickup_location}</p>
              <p>Pickup date: {pickup_date.toString()}</p>
              <p>Dropoff location: {dropoff_location}</p>
              <p>Dropoff date: {dropoff_date.toString()}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
