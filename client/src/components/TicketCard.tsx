import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { Clock, User, AlertCircle, CheckCircle, XCircle, Circle } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";

interface TicketCardProps {
  id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  category: string;
  customerName: string;
  assignedTo?: string | null;
  customerEmail: string;
  createdAt: Date | string | null;
  updatedAt?: Date | string | null;
}

const statusConfig: Record<string, { icon: any, color: string, variant: "default" | "secondary" }> = {
  open: { icon: Circle, color: "bg-blue-500", variant: "default" },
  "in-progress": { icon: Clock, color: "bg-yellow-500", variant: "secondary" },
  resolved: { icon: CheckCircle, color: "bg-green-500", variant: "secondary" },
  closed: { icon: XCircle, color: "bg-gray-500", variant: "secondary" },
};

const priorityConfig: Record<string, { color: string, variant: "secondary" | "destructive" }> = {
  low: { color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100", variant: "secondary" },
  medium: { color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100", variant: "secondary" },
  high: { color: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-100", variant: "secondary" },
  urgent: { color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100", variant: "destructive" },
};

export default function TicketCard({ 
  id, 
  title, 
  description, 
  status, 
  priority, 
  category, 
  customerName, 
  assignedTo, 
  createdAt 
}: TicketCardProps) {
  const statusInfo = statusConfig[status] || statusConfig.open;
  const StatusIcon = statusInfo.icon;
  const priorityInfo = priorityConfig[priority] || priorityConfig.medium;
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const updateStatusMutation = useMutation({
    mutationFn: async ({ newStatus, assignedTo: newAssignedTo }: { newStatus: string, assignedTo?: string }) => {
      const response = await apiRequest("PUT", `/api/tickets/${id}/status`, { 
        status: newStatus, 
        assignedTo: newAssignedTo 
      });
      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/tickets"] });
      toast({
        title: "Status Updated",
        description: "Ticket status has been updated successfully.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update ticket status.",
        variant: "destructive",
      });
    },
  });
  
  const handleViewDetails = () => {
    console.log(`View details clicked for ticket ${id}`);
    // TODO: Navigate to ticket details
  };

  const handleStatusChange = (newStatus: string) => {
    updateStatusMutation.mutate({ newStatus });
  };

  return (
    <Card className="hover-elevate transition-all duration-300" data-testid={`card-ticket-${id}`}>
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-4">
        <div className="space-y-2 flex-1">
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="font-mono text-xs" data-testid={`text-ticket-id-${id}`}>
              #{id.slice(0, 8)}
            </Badge>
            <Badge className={priorityInfo.color} data-testid={`badge-priority-${id}`}>
              {priority.toUpperCase()}
            </Badge>
          </div>
          <CardTitle className="text-lg font-semibold leading-tight" data-testid={`text-ticket-title-${id}`}>
            {title}
          </CardTitle>
        </div>
        <Badge 
          variant={statusInfo.variant}
          className="flex items-center space-x-1"
          data-testid={`badge-status-${id}`}
        >
          <StatusIcon className="h-3 w-3" />
          <span>{status.replace('-', ' ').toUpperCase()}</span>
        </Badge>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <p className="text-muted-foreground text-sm line-clamp-2" data-testid={`text-ticket-description-${id}`}>
          {description}
        </p>
        
        <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
          <div className="flex items-center space-x-1" data-testid={`text-ticket-category-${id}`}>
            <AlertCircle className="h-3 w-3" />
            <span>{category}</span>
          </div>
          <div className="flex items-center space-x-1" data-testid={`text-ticket-customer-${id}`}>
            <User className="h-3 w-3" />
            <span>{customerName}</span>
          </div>
          {assignedTo && (
            <div className="flex items-center space-x-1" data-testid={`text-ticket-assigned-${id}`}>
              <User className="h-3 w-3 text-primary" />
              <span className="text-primary">{assignedTo}</span>
            </div>
          )}
        </div>
        
        <div className="flex items-center justify-between pt-4">
          <span className="text-xs text-muted-foreground" data-testid={`text-ticket-created-${id}`}>
            Created: {createdAt ? new Date(createdAt).toLocaleDateString() : 'Unknown'}
          </span>
          <div className="flex space-x-2">
            <Select onValueChange={handleStatusChange} defaultValue={status}>
              <SelectTrigger className="w-auto h-8" data-testid={`select-status-${id}`}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="open">Open</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
            <Button 
              size="sm"
              onClick={handleViewDetails}
              data-testid={`button-view-details-${id}`}
              disabled={updateStatusMutation.isPending}
            >
              View Details
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}