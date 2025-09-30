import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Search, Filter, Ticket, Clock, CheckCircle, XCircle, Plus } from "lucide-react";
import TicketCard from "./TicketCard";
import { apiRequest } from "@/lib/queryClient";
import type { Ticket as TicketType } from "@shared/schema";


export default function TicketDashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch tickets from API
  const { data: tickets = [], isLoading, error } = useQuery<TicketType[]>({
    queryKey: ["/api/tickets", { status: statusFilter, priority: priorityFilter, search: searchTerm }],
    queryFn: async ({ queryKey }) => {
      const [baseUrl, filters] = queryKey;
      const params = new URLSearchParams();
      
      if (filters && typeof filters === 'object') {
        Object.entries(filters).forEach(([key, value]) => {
          if (value && value !== 'all') {
            params.append(key, String(value));
          }
        });
      }
      
      const url = params.toString() ? `${baseUrl}?${params.toString()}` : baseUrl as string;
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch tickets');
      return await response.json();
    },
  });

  const getStatusCount = (status: string) => {
    return tickets.filter(ticket => ticket.status === status).length;
  };

  const handleCreateTicket = () => {
    console.log('Create new ticket clicked');
    // TODO: Navigate to create ticket form
  };

  return (
    <div className="space-y-8">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card data-testid="card-stats-open">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Open Tickets</CardTitle>
            <Ticket className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" data-testid="text-open-count">
              {getStatusCount('open')}
            </div>
          </CardContent>
        </Card>

        <Card data-testid="card-stats-in-progress">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">In Progress</CardTitle>
            <Clock className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" data-testid="text-in-progress-count">
              {getStatusCount('in-progress')}
            </div>
          </CardContent>
        </Card>

        <Card data-testid="card-stats-resolved">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Resolved</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" data-testid="text-resolved-count">
              {getStatusCount('resolved')}
            </div>
          </CardContent>
        </Card>

        <Card data-testid="card-stats-closed">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Closed</CardTitle>
            <XCircle className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" data-testid="text-closed-count">
              {getStatusCount('closed')}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="text-xl font-semibold" data-testid="text-dashboard-title">
            Support Tickets
          </CardTitle>
          <Button onClick={handleCreateTicket} data-testid="button-create-new-ticket">
            <Plus className="mr-2 h-4 w-4" />
            Create Ticket
          </Button>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search tickets..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
                data-testid="input-search-tickets"
              />
            </div>
            
            <div className="flex gap-4">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[140px]" data-testid="select-status-filter">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>

              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger className="w-[140px]" data-testid="select-priority-filter">
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priority</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Active Filters */}
          {(statusFilter !== "all" || priorityFilter !== "all" || searchTerm) && (
            <div className="flex flex-wrap gap-2 mb-4">
              <Filter className="h-4 w-4 text-muted-foreground mt-1" />
              <span className="text-sm text-muted-foreground mr-2">Active filters:</span>
              {searchTerm && (
                <Badge variant="secondary" data-testid="badge-search-filter">
                  Search: {searchTerm}
                </Badge>
              )}
              {statusFilter !== "all" && (
                <Badge variant="secondary" data-testid="badge-status-filter">
                  Status: {statusFilter.replace('-', ' ')}
                </Badge>
              )}
              {priorityFilter !== "all" && (
                <Badge variant="secondary" data-testid="badge-priority-filter">
                  Priority: {priorityFilter}
                </Badge>
              )}
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => {
                  setSearchTerm("");
                  setStatusFilter("all");
                  setPriorityFilter("all");
                }}
                data-testid="button-clear-filters"
              >
                Clear all
              </Button>
            </div>
          )}

          {/* Results count */}
          <div className="text-sm text-muted-foreground mb-4" data-testid="text-results-count">
            {isLoading ? "Loading tickets..." : `Showing ${tickets.length} tickets`}
          </div>
        </CardContent>
      </Card>

      {/* Loading state */}
      {isLoading && (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading tickets...</p>
        </div>
      )}

      {/* Error state */}
      {error && (
        <Card>
          <CardContent className="text-center py-12">
            <XCircle className="mx-auto h-12 w-12 text-red-500 mb-4" />
            <h3 className="text-lg font-medium mb-2">Error Loading Tickets</h3>
            <p className="text-muted-foreground mb-4">
              Failed to load tickets. Please try again.
            </p>
            <Button onClick={() => queryClient.invalidateQueries({ queryKey: ["/api/tickets"] })}>
              Retry
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Tickets Grid */}
      {!isLoading && !error && tickets.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {tickets.map((ticket) => (
            <TicketCard key={ticket.id} {...ticket} />
          ))}
        </div>
      )}

      {/* No results message */}
      {!isLoading && !error && tickets.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Ticket className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2" data-testid="text-no-tickets-title">
              No tickets found
            </h3>
            <p className="text-muted-foreground mb-4" data-testid="text-no-tickets-message">
              No tickets match your current filters. Try adjusting your search or filters.
            </p>
            <Button 
              variant="outline" 
              onClick={() => {
                setSearchTerm("");
                setStatusFilter("all");
                setPriorityFilter("all");
              }}
              data-testid="button-reset-filters"
            >
              Reset Filters
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}