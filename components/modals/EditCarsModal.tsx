"use client"
import React, { useEffect } from 'react'
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Input
} from "@/components/ui/input";
import {
  Button
} from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useModal } from '@/hooks/useModalStore';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
  car_name: z.string().min(1, {
    message: "Car name is required."
  }),
  day_rate: z
    .union([z.string(), z.number()])
    .refine(value => {
      if (typeof value === 'number') {
        return value >= 1;
      }
      if (typeof value === 'string') {
        const parsedValue = parseFloat(value);
        return !isNaN(parsedValue) && parsedValue >= 1;
      }
      return false;
    }, {
      message: "Day rate must be a non-negative number."
    }),
  month_rate: z
    .union([z.string(), z.number()])
    .refine(value => {
      if (typeof value === 'number') {
        return value >= 1;
      }
      if (typeof value === 'string') {
        const parsedValue = parseFloat(value);
        return !isNaN(parsedValue) && parsedValue >= 1;
      }
      return false;
    }, {
      message: "Month rate must be a non-negative number."
    }),
  image_url: z.string().min(1, {
    message: "Image URL is required."
  }),
});


export default function EditCarsModal() {

  const {isOpen, onClose, data, type} = useModal()
  const router = useRouter()
  const isModalOpen = isOpen && type === "editCar"
  const { car: {car_name, day_rate, id, image_url, month_rate} = {} } = data
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      car_name: "",
      day_rate: 0,
      month_rate: 0,
      image_url: ""
    }
  });

  useEffect(() => {
    form.setValue("car_name", car_name ?? "")
    form.setValue("day_rate", day_rate ?? 1)
    form.setValue("month_rate", month_rate ?? 1)
    form.setValue("image_url", image_url ?? "")
  }, [car_name, day_rate, id, image_url, month_rate])
  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values, id)
    try {
      await axios.patch(`api/cars/${id}`, values);

      form.reset();
      router.refresh();
      onClose();
    } catch (error) {
      console.log(error);
    }
  }

  const handleClose = () => {
    form.reset();
    onClose();
  }


  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Create Channel
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(e => {
            e.day_rate = Number(e.day_rate)
            e.month_rate = Number(e.month_rate)
            return onSubmit(e)
          })} className="space-y-8">
            <div className="space-y-8 px-6">
              <FormField
                control={form.control}
                name="car_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel
                      className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70"
                    >
                      Car name
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                        placeholder="Enter channel name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="day_rate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel
                      className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70"
                    >
                      Day rate
                    </FormLabel>
                    <FormControl>
                      <Input
                      type='number'
                        disabled={isLoading}
                        className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                        placeholder="Enter channel name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="month_rate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel
                      className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70"
                    >
                      Month rate
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                        placeholder="Enter channel name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="image_url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel
                      className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70"
                    >
                      Image Url
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                        placeholder="Enter channel name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter className="bg-gray-100 px-6 py-4">
              <Button variant="default" disabled={isLoading}>
                Create
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
