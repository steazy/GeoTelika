import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";

const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email address is required"),
  company: z.string().min(1, "Company name is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  serviceInterest: z.enum(["server-management", "cybersecurity", "cloud-solutions", "network-infrastructure", "data-management", "it-support", "custom-solution"]),
  message: z.string().min(20, "Please provide more details about your needs"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      phone: "",
      serviceInterest: "custom-solution",
      message: "",
    },
  });

  const contactMutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      const response = await apiRequest("POST", "/api/contact", data);
      return await response.json();
    },
    onSuccess: () => {
      setIsSubmitted(true);
      form.reset();
      toast({
        title: "Message Sent",
        description: "Thank you for your message! We'll get back to you within 24 hours.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to send message. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    contactMutation.mutate(data);
  };

  if (isSubmitted) {
    return (
      <div className="container mx-auto px-4 py-12">
        <Card className="max-w-2xl mx-auto">
          <CardContent className="pt-8 text-center space-y-4">
            <div className="mx-auto bg-green-100 dark:bg-green-900 rounded-full p-4 w-16 h-16 flex items-center justify-center">
              <Send className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2" data-testid="text-contact-success-title">
                Message Sent Successfully!
              </h3>
              <p className="text-muted-foreground mb-6" data-testid="text-contact-success-message">
                Thank you for your interest in our services. Our team will review your message and get back to you within 24 hours.
              </p>
              <Button 
                onClick={() => setIsSubmitted(false)}
                data-testid="button-send-another-message"
              >
                Send Another Message
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6" data-testid="text-contact-page-title">
          Get in Touch
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="text-contact-page-description">
          Ready to transform your IT infrastructure? Contact our team of experts for a free consultation and custom solution.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contact Information */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2" data-testid="text-contact-info-title">
                <Phone className="h-5 w-5" />
                <span>Contact Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start space-x-3" data-testid="text-contact-phone">
                <Phone className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <div className="font-medium">Phone</div>
                  <div className="text-muted-foreground">(301) 660-8483</div>
                  <div className="text-sm text-muted-foreground">24/7 Emergency Line</div>
                </div>
              </div>
              
              <div className="flex items-start space-x-3" data-testid="text-contact-email">
                <Mail className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <div className="font-medium">Email</div>
                  <div className="text-muted-foreground">support@geotelika.com</div>
                  <div className="text-sm text-muted-foreground">Response within 4 hours</div>
                </div>
              </div>
              
              <div className="flex items-start space-x-3" data-testid="text-contact-address">
                <MapPin className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <div className="font-medium">Office</div>
                  <div className="text-muted-foreground">
                    514-A South Main Street<br />
                    Hinesville, GA 31313
                  </div>
                </div>
              </div>
              
              <div className="flex items-start space-x-3" data-testid="text-contact-hours">
                <Clock className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <div className="font-medium">Business Hours</div>
                  <div className="text-muted-foreground">
                    Mon-Fri: 8AM-6PM PST<br />
                    Emergency: 24/7/365
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-3" data-testid="text-why-choose-title">
                Why Choose Geotelika?
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center" data-testid="text-why-choose-1">
                  • 156+ tickets resolved efficiently
                </li>
                <li className="flex items-center" data-testid="text-why-choose-2">
                  • 99.9% uptime guarantee
                </li>
                <li className="flex items-center" data-testid="text-why-choose-3">
                  • 24/7 expert support
                </li>
                <li className="flex items-center" data-testid="text-why-choose-4">
                  • Custom solutions for every budget
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle data-testid="text-contact-form-title">
                Send us a Message
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name *</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Enter your full name" 
                              {...field} 
                              data-testid="input-contact-name"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address *</FormLabel>
                          <FormControl>
                            <Input 
                              type="email"
                              placeholder="your.email@company.com" 
                              {...field} 
                              data-testid="input-contact-email"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="company"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Company Name *</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Your company name" 
                              {...field} 
                              data-testid="input-contact-company"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number *</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="(555) 123-4567" 
                              {...field} 
                              data-testid="input-contact-phone"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="serviceInterest"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Service of Interest *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger data-testid="select-contact-service">
                              <SelectValue placeholder="Select a service" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="server-management">Server Management</SelectItem>
                            <SelectItem value="cybersecurity">Cybersecurity Solutions</SelectItem>
                            <SelectItem value="cloud-solutions">Cloud Infrastructure</SelectItem>
                            <SelectItem value="network-infrastructure">Network Infrastructure</SelectItem>
                            <SelectItem value="data-management">Data Management</SelectItem>
                            <SelectItem value="it-support">24/7 IT Support</SelectItem>
                            <SelectItem value="custom-solution">Custom Solution</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message *</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Please tell us about your current IT challenges, goals, and how we can help your business..."
                            className="min-h-[120px]"
                            {...field} 
                            data-testid="textarea-contact-message"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={contactMutation.isPending}
                    size="lg"
                    data-testid="button-submit-contact"
                  >
                    {contactMutation.isPending ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                        Sending Message...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}