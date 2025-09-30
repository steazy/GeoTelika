import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { AlertCircle, Send } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";

const createTicketSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().min(20, "Description must be at least 20 characters"),
  priority: z.enum(["low", "medium", "high", "urgent"]),
  category: z.enum(["hardware", "software", "network", "security", "other"]),
  customerName: z.string().min(2, "Name is required"),
  customerEmail: z.string().email("Valid email address is required"),
});

type CreateTicketFormData = z.infer<typeof createTicketSchema>;

export default function CreateTicketForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<CreateTicketFormData>({
    resolver: zodResolver(createTicketSchema),
    defaultValues: {
      title: "",
      description: "",
      priority: "medium",
      category: "other",
      customerName: "",
      customerEmail: "",
    },
  });

  const createTicketMutation = useMutation({
    mutationFn: async (data: CreateTicketFormData) => {
      const response = await apiRequest("POST", "/api/tickets", data);
      return await response.json();
    },
    onSuccess: () => {
      setIsSubmitted(true);
      form.reset();
      queryClient.invalidateQueries({ queryKey: ["/api/tickets"] });
      toast({
        title: "Success",
        description: "Your support ticket has been created successfully!",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to create ticket. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = async (data: CreateTicketFormData) => {
    createTicketMutation.mutate(data);
  };

  if (isSubmitted) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardContent className="pt-8 text-center space-y-4">
          <div className="mx-auto bg-green-100 dark:bg-green-900 rounded-full p-4 w-16 h-16 flex items-center justify-center">
            <Send className="h-8 w-8 text-green-600 dark:text-green-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2" data-testid="text-ticket-success-title">
              Ticket Created Successfully!
            </h3>
            <p className="text-muted-foreground mb-6" data-testid="text-ticket-success-message">
              Your support ticket has been created. Our team will review it and get back to you within 24 hours.
            </p>
            <Button 
              onClick={() => setIsSubmitted(false)}
              data-testid="button-create-another-ticket"
            >
              Create Another Ticket
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2" data-testid="text-create-ticket-title">
          <AlertCircle className="h-5 w-5" />
          <span>Create Support Ticket</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="customerName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Name *</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter your full name" 
                        {...field} 
                        data-testid="input-customer-name"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="customerEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address *</FormLabel>
                    <FormControl>
                      <Input 
                        type="email"
                        placeholder="your.email@company.com" 
                        {...field} 
                        data-testid="input-customer-email"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Issue Title *</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Brief description of your issue" 
                      {...field} 
                      data-testid="input-ticket-title"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger data-testid="select-category">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="hardware">Hardware</SelectItem>
                        <SelectItem value="software">Software</SelectItem>
                        <SelectItem value="network">Network</SelectItem>
                        <SelectItem value="security">Security</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="priority"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Priority *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger data-testid="select-priority">
                          <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="urgent">Urgent</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Detailed Description *</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Please provide a detailed description of your issue, including any error messages and steps to reproduce the problem..."
                      className="min-h-[120px]"
                      {...field} 
                      data-testid="textarea-description"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button 
              type="submit" 
              className="w-full" 
              disabled={createTicketMutation.isPending}
              data-testid="button-submit-ticket"
            >
              {createTicketMutation.isPending ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  Creating Ticket...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Create Ticket
                </>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}