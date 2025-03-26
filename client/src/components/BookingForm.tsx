import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { PhoneIcon, WhatsAppIcon } from "@/assets/icons";
import { SERVICE_AREAS, PHONE_NUMBER, WHATSAPP_NUMBER } from "@/lib/constants";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const bookingSchema = z.object({
  fullName: z.string().min(2, { message: "Name must be at least 2 characters" }),
  phoneNumber: z.string().min(10, { message: "Phone number must be at least 10 digits" }),
  packageType: z.string().min(1, { message: "Please select a package" }),
  preferredDate: z.string().min(1, { message: "Please select a date" }),
  address: z.string().min(10, { message: "Address must be at least 10 characters" })
});

type BookingFormValues = z.infer<typeof bookingSchema>;

const BookingForm = () => {
  const { toast } = useToast();
  
  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      fullName: "",
      phoneNumber: "",
      packageType: "",
      preferredDate: "",
      address: ""
    }
  });

  const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER.replace(/\+/g, '')}?text=`;
  const phoneLink = `tel:${PHONE_NUMBER}`;

  const onSubmit = (data: BookingFormValues) => {
    // Format the booking details for WhatsApp
    const message = encodeURIComponent(
      `New Booking Request:\n\n` +
      `Name: ${data.fullName}\n` +
      `Phone: ${data.phoneNumber}\n` +
      `Package: ${data.packageType}\n` +
      `Date: ${data.preferredDate}\n` +
      `Address: ${data.address}`
    );
  
    // Open WhatsApp with pre-filled message
    window.open(`${whatsappLink}${message}`, '_blank');
    
    // Show success message
    toast({
      title: "Redirecting to WhatsApp",
      description: "You will be redirected to WhatsApp to complete your booking.",
      duration: 5000,
    });
    
    // Reset form
    form.reset();
  };

  return (
    <section className="py-16 bg-primary-50 bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-['Inter'] font-bold text-gray-900 mb-4">Book Your Test Now</h2>
          <p className="max-w-2xl mx-auto text-xl text-gray-600">Quick and easy booking process with instant confirmation</p>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2 p-8">
              <h3 className="text-2xl font-['Inter'] font-bold text-gray-900 mb-6">Contact Us</h3>
              <div className="space-y-6">
                <div className="flex items-center">
                  <div className="h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center mr-4">
                    <PhoneIcon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Call us directly</p>
                    <a href={phoneLink} className="text-lg font-medium text-gray-900 hover:text-primary">📞 {PHONE_NUMBER}</a>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mr-4">
                    <WhatsAppIcon className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">WhatsApp for instant booking</p>
                    <a href={whatsappLink} className="text-lg font-medium text-gray-900 hover:text-green-600">💬 {WHATSAPP_NUMBER}</a>
                  </div>
                </div>
              </div>

              <div className="mt-8 bg-blue-50 p-4 rounded-lg border border-blue-100">
                <h4 className="font-medium text-gray-900 mb-2">Service Available Areas</h4>
                <p className="text-gray-600">
                  We currently offer free home collection services in {SERVICE_AREAS.join(", ")}.
                </p>
              </div>
            </div>
            
            <div className="md:w-1/2 p-8 bg-gray-50">
              <h3 className="text-2xl font-['Inter'] font-bold text-gray-900 mb-6">Book Online</h3>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="phoneNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input placeholder="Your contact number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="packageType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Select Package</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Choose a package" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="basic">Basic Health Package - ₹999</SelectItem>
                            <SelectItem value="premium">Premium Health Package - ₹1,999</SelectItem>
                            <SelectItem value="executive">Executive Health Package - ₹3,599</SelectItem>
                            <SelectItem value="custom">Individual Tests</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="preferredDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Preferred Date</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Your complete address for home collection" 
                            rows={3} 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className="w-full py-3"
                  >
                    Schedule Home Collection
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingForm;
