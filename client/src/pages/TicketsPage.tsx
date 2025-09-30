import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TicketDashboard from "@/components/TicketDashboard";
import CreateTicketForm from "@/components/CreateTicketForm";
import { Plus, List } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";

export default function TicketsPage() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [, setLocation] = useLocation();

  // Check authentication status
  const { data: authStatus, isLoading: authLoading } = useQuery({
    queryKey: ["/api/auth/session"],
    queryFn: async () => {
      const response = await apiRequest("GET", "/api/auth/session");
      return await response.json();
    },
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Redirect to auth if not authenticated
  useEffect(() => {
    if (!authLoading && !authStatus?.authenticated) {
      setLocation("/auth");
    }
  }, [authStatus, authLoading, setLocation]);

  // Show loading while checking authentication
  if (authLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
        </div>
      </div>
    );
  }

  // Don't render content if not authenticated (will redirect)
  if (!authStatus?.authenticated) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2" data-testid="text-page-title">
          Support Portal
        </h1>
        <p className="text-muted-foreground" data-testid="text-page-description">
          Create new support tickets or manage existing ones through our integrated platform
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="dashboard" className="flex items-center space-x-2" data-testid="tab-dashboard">
            <List className="h-4 w-4" />
            <span>Ticket Dashboard</span>
          </TabsTrigger>
          <TabsTrigger value="create" className="flex items-center space-x-2" data-testid="tab-create">
            <Plus className="h-4 w-4" />
            <span>Create Ticket</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="dashboard" className="mt-8">
          <TicketDashboard />
        </TabsContent>
        
        <TabsContent value="create" className="mt-8">
          <div className="max-w-4xl mx-auto">
            <CreateTicketForm />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}