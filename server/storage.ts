import { users, tickets, demoRequests, type User, type InsertUser, type Ticket, type InsertTicket, type DemoRequest, type InsertDemoRequest } from "@shared/schema";
import { db } from "./db";
import { eq, desc, ilike, and, or } from "drizzle-orm";
import { randomUUID } from "crypto";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  // Ticket management methods
  createTicket(ticket: InsertTicket): Promise<Ticket>;
  getTickets(filters?: {
    status?: string;
    priority?: string;
    search?: string;
    limit?: number;
    offset?: number;
  }): Promise<Ticket[]>;
  getTicketById(id: string): Promise<Ticket | undefined>;
  updateTicketStatus(id: string, status: string, assignedTo?: string): Promise<Ticket | undefined>;
  updateTicket(id: string, updates: Partial<Omit<Ticket, 'id' | 'createdAt'>>): Promise<Ticket | undefined>;
  // Demo request methods
  createDemoRequest(demoRequest: InsertDemoRequest): Promise<DemoRequest>;
  getDemoRequests(): Promise<DemoRequest[]>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  // Ticket management implementations
  async createTicket(insertTicket: InsertTicket): Promise<Ticket> {
    const [ticket] = await db
      .insert(tickets)
      .values({
        ...insertTicket,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returning();
    return ticket;
  }

  async getTickets(filters: {
    status?: string;
    priority?: string;
    search?: string;
    limit?: number;
    offset?: number;
  } = {}): Promise<Ticket[]> {
    const conditions = [];
    
    if (filters.status && filters.status !== 'all') {
      conditions.push(eq(tickets.status, filters.status));
    }
    
    if (filters.priority && filters.priority !== 'all') {
      conditions.push(eq(tickets.priority, filters.priority));
    }
    
    if (filters.search) {
      conditions.push(
        or(
          ilike(tickets.title, `%${filters.search}%`),
          ilike(tickets.description, `%${filters.search}%`),
          ilike(tickets.customerName, `%${filters.search}%`)
        )
      );
    }
    
    // Build the base query
    let query = db.select().from(tickets);
    
    // Add conditions if any
    if (conditions.length > 0) {
      query = query.where(and(...conditions)) as any;
    }
    
    // Always order by created date
    query = query.orderBy(desc(tickets.createdAt)) as any;
    
    // Add limit if specified
    if (filters.limit) {
      query = query.limit(filters.limit) as any;
    }
    
    // Add offset if specified
    if (filters.offset) {
      query = query.offset(filters.offset) as any;
    }
    
    return await query;
  }

  async getTicketById(id: string): Promise<Ticket | undefined> {
    const [ticket] = await db.select().from(tickets).where(eq(tickets.id, id));
    return ticket || undefined;
  }

  async updateTicketStatus(id: string, status: string, assignedTo?: string): Promise<Ticket | undefined> {
    const updates: any = {
      status,
      updatedAt: new Date(),
    };
    
    if (assignedTo !== undefined) {
      updates.assignedTo = assignedTo;
    }
    
    const [ticket] = await db
      .update(tickets)
      .set(updates)
      .where(eq(tickets.id, id))
      .returning();
    
    return ticket || undefined;
  }

  async updateTicket(id: string, updates: Partial<Omit<Ticket, 'id' | 'createdAt'>>): Promise<Ticket | undefined> {
    const [ticket] = await db
      .update(tickets)
      .set({
        ...updates,
        updatedAt: new Date(),
      })
      .where(eq(tickets.id, id))
      .returning();
    
    return ticket || undefined;
  }

  // Demo request implementations
  async createDemoRequest(insertDemoRequest: InsertDemoRequest): Promise<DemoRequest> {
    const [demoRequest] = await db
      .insert(demoRequests)
      .values({
        ...insertDemoRequest,
        createdAt: new Date(),
      })
      .returning();
    return demoRequest;
  }

  async getDemoRequests(): Promise<DemoRequest[]> {
    return await db.select().from(demoRequests).orderBy(desc(demoRequests.createdAt));
  }
}

export const storage = new DatabaseStorage();
