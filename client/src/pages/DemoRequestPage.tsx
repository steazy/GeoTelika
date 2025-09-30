import { useState, useEffect } from "react";
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
import { Play, CheckCircle, Calendar, Users, Shield } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";

const demoRequestSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email address is required"),
  company: z.string().min(1, "Company name is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  companySize: z.enum(["1-10", "11-50", "51-200", "201-500", "500+"]),
  primaryInterest: z.enum(["it-support", "cybersecurity", "server-management", "cloud-solutions", "complete-platform"]),
  currentChallenges: z.string().min(20, "Please describe your current IT challenges"),
  preferredTime: z.enum(["morning", "afternoon", "evening", "flexible"]),
});

type DemoRequestData = z.infer<typeof demoRequestSchema>;

export default function DemoRequestPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  // Scroll to top when page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const form = useForm<DemoRequestData>({
    resolver: zodResolver(demoRequestSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      phone: "",
      companySize: "11-50",
      primaryInterest: "complete-platform",
      currentChallenges: "",
      preferredTime: "flexible",
    },
  });

  const demoRequestMutation = useMutation({
    mutationFn: async (data: DemoRequestData) => {
      const response = await apiRequest("POST", "/api/demo-request", data);
      return await response.json();
    },
    onSuccess: () => {
      setIsSubmitted(true);
      form.reset();
      toast({
        title: "Demo Request Submitted",
        description: "Thank you! We'll contact you within 24 hours to schedule your personalized demo.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to submit demo request. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = async (data: DemoRequestData) => {
    demoRequestMutation.mutate(data);
  };

  if (isSubmitted) {
    return (
      <div className="container mx-auto px-4 py-12">
        <Card className="max-w-2xl mx-auto">
          <CardContent className="pt-8 text-center space-y-4">
            <div className="mx-auto bg-green-100 dark:bg-green-900 rounded-full p-4 w-16 h-16 flex items-center justify-center">
              <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2" data-testid="text-demo-success-title">
                Demo Request Submitted Successfully!
              </h3>
              <p className="text-muted-foreground mb-6" data-testid="text-demo-success-message">
                Thank you for your interest in Geotelika's IT solutions. Our team will contact you within 24 hours to schedule your personalized demo.
              </p>
              <Button 
                onClick={() => setIsSubmitted(false)}
                data-testid="button-submit-another-demo"
              >
                Submit Another Request
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
        <div className="flex items-center justify-center space-x-2 mb-4">
          <div className="bg-primary text-primary-foreground rounded-lg p-3">
            <Play className="h-6 w-6" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold" data-testid="text-demo-page-title">
            Request a Demo
          </h1>
        </div>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8" data-testid="text-demo-page-description">
          See Geotelika's IT support platform in action. Get a personalized demo tailored to your business needs and discover how we can transform your IT operations.
        </p>
        
        {/* Benefits Preview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="flex flex-col items-center text-center space-y-2">
            <div className="bg-blue-100 dark:bg-blue-900 rounded-full p-3">
              <Calendar className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="font-semibold">Live Platform Demo</h3>
            <p className="text-sm text-muted-foreground">See our support system in real-time</p>
          </div>
          <div className="flex flex-col items-center text-center space-y-2">
            <div className="bg-green-100 dark:bg-green-900 rounded-full p-3">
              <Users className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="font-semibold">Custom Solutions</h3>
            <p className="text-sm text-muted-foreground">Tailored to your specific needs</p>
          </div>
          <div className="flex flex-col items-center text-center space-y-2">
            <div className="bg-purple-100 dark:bg-purple-900 rounded-full p-3">
              <Shield className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="font-semibold">Expert Consultation</h3>
            <p className="text-sm text-muted-foreground">Free IT assessment included</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Demo Request Form */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle data-testid="text-demo-form-title">
                Schedule Your Personalized Demo
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
                              data-testid="input-demo-name"
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
                              data-testid="input-demo-email"
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
                              data-testid="input-demo-company"
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
                              placeholder="(301) 660-8483" 
                              {...field} 
                              data-testid="input-demo-phone"
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
                      name="companySize"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Company Size *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger data-testid="select-demo-company-size">
                                <SelectValue placeholder="Select company size" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="1-10">1-10 employees</SelectItem>
                              <SelectItem value="11-50">11-50 employees</SelectItem>
                              <SelectItem value="51-200">51-200 employees</SelectItem>
                              <SelectItem value="201-500">201-500 employees</SelectItem>
                              <SelectItem value="500+">500+ employees</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="preferredTime"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Preferred Demo Time *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger data-testid="select-demo-time">
                                <SelectValue placeholder="Select preferred time" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="morning">Morning (9AM - 12PM)</SelectItem>
                              <SelectItem value="afternoon">Afternoon (12PM - 5PM)</SelectItem>
                              <SelectItem value="evening">Evening (5PM - 7PM)</SelectItem>
                              <SelectItem value="flexible">Flexible</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="primaryInterest"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Primary Area of Interest *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger data-testid="select-demo-interest">
                              <SelectValue placeholder="Select your primary interest" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="complete-platform">Complete IT Support Platform</SelectItem>
                            <SelectItem value="it-support">24/7 IT Support</SelectItem>
                            <SelectItem value="cybersecurity">Cybersecurity Solutions</SelectItem>
                            <SelectItem value="server-management">Server Management</SelectItem>
                            <SelectItem value="cloud-solutions">Cloud Infrastructure</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="currentChallenges"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Current IT Challenges *</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Please describe your current IT challenges, pain points, and what you hope to achieve with a new IT support solution..."
                            className="min-h-[120px]"
                            {...field} 
                            data-testid="textarea-demo-challenges"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={demoRequestMutation.isPending}
                    size="lg"
                    data-testid="button-submit-demo"
                  >
                    {demoRequestMutation.isPending ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                        Submitting Request...
                      </>
                    ) : (
                      <>
                        <Play className="mr-2 h-4 w-4" />
                        Request Demo
                      </>
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>

        {/* Why Demo Section */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2" data-testid="text-why-demo-title">
                <Play className="h-5 w-5" />
                <span>What You'll See</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Live Ticket Management</h4>
                    <p className="text-sm text-muted-foreground">See how tickets are created, tracked, and resolved</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Real-time Monitoring</h4>
                    <p className="text-sm text-muted-foreground">Dashboard views of your IT infrastructure</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Custom Workflows</h4>
                    <p className="text-sm text-muted-foreground">Tailored processes for your business</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Security Features</h4>
                    <p className="text-sm text-muted-foreground">Advanced cybersecurity tools and monitoring</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-3" data-testid="text-demo-stats-title">
                Demo Experience
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center" data-testid="text-demo-stat-1">
                  • 30-minute personalized demo
                </li>
                <li className="flex items-center" data-testid="text-demo-stat-2">
                  • Free IT assessment included
                </li>
                <li className="flex items-center" data-testid="text-demo-stat-3">
                  • Custom solution recommendations
                </li>
                <li className="flex items-center" data-testid="text-demo-stat-4">
                  • No obligation or pressure
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}