"use client";
import React, { useEffect } from "react";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useModal } from "@/hooks/useModalStore";
import axios from "axios";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  pickup_date: z.string().min(1, {
    message: 'Pickup date is required.',
  }),
  dropoff_date: z.string().min(1, {
    message: 'Dropoff date is required.',
  }),
  pickup_location: z.string().min(1, {
    message: 'Pickup location is required.',
  }),
  dropoff_location: z.string().min(1, {
    message: 'Dropoff location is required.',
  }),
});

export default function BookCarModal() {
  const { isOpen, onClose, data, type } = useModal();
  const router = useRouter();
  const isModalOpen = isOpen && type === "makeOrder";
  const { car: { car_name, id } = {} } = data;
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      pickup_date: "",
      dropoff_date: "",
      pickup_location: "",
      dropoff_location: ""
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values, id);
    try {
      let {dropoff_date, pickup_date } = values
      let formatDropOff = new Date(dropoff_date).toISOString()
      let formatPickUp = new Date(pickup_date).toISOString()
      await axios.post(`/api/order`, {...values, dropoff_date: formatDropOff, pickup_date: formatPickUp,  car_id: id});

      form.reset();
      router.refresh();
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = () => {
    form.reset();
    onClose();
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Book {car_name} Now
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-8 px-6">
              <FormField
                control={form.control}
                name="pickup_date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                      Select a Pick up Date:
                    </FormLabel>
                    <FormControl>
                      <div className="focus-visible:ring-0 text-black focus-visible:ring-offset-0">
                        <input
                        type="datetime-local"
                          id="date"
                          disabled={isLoading}
                          className="w-full bg-zinc-300/50 border focus-visible:ring-0 text-black focus-visible:ring-offset-0 p-2"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dropoff_date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                      Select Drop Off Date:
                    </FormLabel>
                    <FormControl>
                      <div className="focus-visible:ring-0 text-black focus-visible:ring-offset-0">
                        <input
                          type="datetime-local"
                          id="date"
                          disabled={isLoading}
                          className="w-full bg-zinc-300/50 border focus-visible:ring-0 text-black focus-visible:ring-offset-0 p-2"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="pickup_location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                      Pickup location
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
                name="dropoff_location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                      Dropoff location
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
                Book {car_name} Now!
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
