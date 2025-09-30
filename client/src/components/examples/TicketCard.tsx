import TicketCard from '../TicketCard'

export default function TicketCardExample() {
  // TODO: remove mock data
  const mockTicket = {
    id: "ticket-123-456",
    title: "Email server configuration issues",
    description: "Users unable to send emails through Outlook. Server returning authentication errors and connection timeouts during peak hours.",
    status: "in-progress",
    priority: "high",
    category: "Network",
    customerName: "Tech Solutions Inc.",
    customerEmail: "admin@techsolutions.com",
    assignedTo: "Sarah Johnson",
    createdAt: "2024-01-15T10:30:00Z"
  };

  return <TicketCard {...mockTicket} />
}