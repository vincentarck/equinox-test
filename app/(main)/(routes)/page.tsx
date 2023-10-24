import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import CarsPage from "./cars/page";
import OrdersPage from "./orders/page";

export default function Page() {
  return (
    <main className="flex flex-col gap-y-4 p-10">
      <h1 className="font-bold text-2xl">EQUINOX TECHNOLOGY INDONESIA</h1>
      <Tabs defaultValue="account" className="max-w-[1200px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="account">Cars</TabsTrigger>
        <TabsTrigger value="password">Orders</TabsTrigger>
      </TabsList>
      <TabsContent value="account" className="min-w-max">
        <Card>
          <CardHeader>
            <CardTitle >Cars</CardTitle>
            <CardDescription className="min-w-[500px]">
              The latest and updated cars you need by Equinox Technology
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <CarsPage />
          </CardContent>
          <CardFooter>
          <CardDescription className="min-w-[500px]">
              Built with passion ❤️
            </CardDescription>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="password">
      <Card>
          <CardHeader>
            <CardTitle >Orders</CardTitle>
            <CardDescription className="min-w-[500px]">
              Keep going, trust become worthy when it running by Equinox
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <OrdersPage />
          </CardContent>
          <CardFooter>
          <CardDescription className="min-w-[500px]">
              Built with passion ❤️
            </CardDescription>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
    </main>
  );
}
