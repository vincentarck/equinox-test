import Image from "next/image";
import axios from "axios";
import { db } from "@/lib/db";
import CarsCard from "@/components/CarsCard";
import { Car } from "../../../../node_modules/.prisma/client";

export default async function CarsPage() {
  const cars: Car[] = await db.car.findMany();
  console.log(cars);
  return (
    <div>
      <h2 className="font-semibold text-lg text-slate-600">Rent cars as you go with ease action</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {
          cars.map(car => <CarsCard key={car.id} car={car} />)
        }
      </div>
    </div>
  );
}
