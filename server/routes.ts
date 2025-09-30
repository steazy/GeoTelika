import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertTicketSchema, insertUserSchema, insertDemoRequestSchema } from "@shared/schema";
import { fromZodError } from "zod-validation-error";
import { hashPassword, verifyPassword, requireAuth, getCurrentUser } from "./auth";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Authentication routes
  
  // POST /api/auth/register - Register new user
  app.post("/api/auth/register", async (req, res) => {
    try {
      const validationResult = insertUserSchema.safeParse(req.body);
      
      if (!validationResult.success) {
        const errorMessage = fromZodError(validationResult.error);
        return res.status(400).json({ 
          error: "Validation failed", 
          details: errorMessage.message 
        });
      }
      
      const { username, password } = validationResult.data;
      
      // Check if user already exists
      const existingUser = await storage.getUserByUsername(username);
      if (existingUser) {
        return res.status(409).json({ 
          error: "Username already exists", 
          message: "This username is already registered. Please try logging in or choose a different username." 
        });
      }
      
      // Hash password and create user
      const hashedPassword = await hashPassword(password);
      const user = await storage.createUser({
        username,
        password: hashedPassword
      });
      
      // Regenerate session to prevent session fixation
      req.session.regenerate((err) => {
        if (err) {
          console.error("Error regenerating session:", err);
          return res.status(500).json({ error: "Failed to create session" });
        }
        
        // Create session
        req.session.userId = user.id;
        req.session.username = user.username;

        console.log("[auth-debug] Registered user session:", req.session);

        res.on("finish", () => {
          console.log("[auth-debug] Set-Cookie headers:", res.getHeaders()["set-cookie"]);
        });
        
        res.status(201).json({ 
          message: "User registered successfully",
          user: { id: user.id, username: user.username }
        });
      });
    } catch (error) {
      console.error("Error registering user:", error);
      res.status(500).json({ error: "Failed to register user" });
    }
  });
  
  // Login validation schema
  const loginSchema = z.object({
    username: z.string().min(1, "Username is required"),
    password: z.string().min(6, "Password must be at least 6 characters"),
  });

  // POST /api/auth/login - Login user
  app.post("/api/auth/login", async (req, res) => {
    try {
      const validationResult = loginSchema.safeParse(req.body);
      
      if (!validationResult.success) {
        const errorMessage = fromZodError(validationResult.error);
        return res.status(400).json({ 
          error: "Validation failed", 
          details: errorMessage.message 
        });
      }
      
      const { username, password } = validationResult.data;
      
      // Find user
      const user = await storage.getUserByUsername(username);
      if (!user) {
        return res.status(401).json({ 
          error: "Invalid credentials",
          message: "Invalid username or password" 
        });
      }
      
      // Verify password
      const isValidPassword = await verifyPassword(password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({ 
          error: "Invalid credentials",
          message: "Invalid username or password" 
        });
      }
      
      // Regenerate session to prevent session fixation
      req.session.regenerate((err) => {
        if (err) {
          console.error("Error regenerating session:", err);
          return res.status(500).json({ error: "Failed to create session" });
        }
        
        // Create session
        req.session.userId = user.id;
        req.session.username = user.username;

        console.log("[auth-debug] Created session for user:", req.session);

        res.on("finish", () => {
          console.log("[auth-debug] Set-Cookie headers:", res.getHeaders()["set-cookie"]);
        });
        
        res.json({ 
          message: "Login successful",
          user: { id: user.id, username: user.username }
        });
      });
    } catch (error) {
      console.error("Error logging in user:", error);
      res.status(500).json({ error: "Failed to log in" });
    }
  });
  
  // POST /api/auth/logout - Logout user
  app.post("/api/auth/logout", (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        console.error("Error destroying session:", err);
        return res.status(500).json({ error: "Failed to logout" });
      }

      console.log("[auth-debug] Session destroyed. Clearing cookie.");
      
      res.clearCookie('connect.sid');
      res.json({ message: "Logout successful" });
    });
  });
  
  // GET /api/auth/session - Check current session
  app.get("/api/auth/session", (req, res) => {
    console.log("[auth-debug] Session check:", req.session);

    const user = getCurrentUser(req);
    if (user) {
      res.json({ 
        authenticated: true,
        user: { id: user.userId, username: user.username }
      });
    } else {
      res.json({ 
        authenticated: false,
        user: null 
      });
    }
  });
  
  // GET /api/auth/user - Get current user info (requires auth)
  app.get("/api/auth/user", requireAuth, (req, res) => {
    const user = getCurrentUser(req);
    res.json({ user: { id: user!.userId, username: user!.username } });
  });

  // Ticket management routes
  app.get("/api/tickets", requireAuth, async (req, res) => {
    try {
      const { status, priority, search, limit, offset } = req.query;
      
      const filters = {
        status: status as string,
        priority: priority as string, 
        search: search as string,
        limit: limit ? parseInt(limit as string) : undefined,
        offset: offset ? parseInt(offset as string) : undefined,
      };
      
      const tickets = await storage.getTickets(filters);
      res.json(tickets);
    } catch (error) {
      console.error("Error fetching tickets:", error);
      res.status(500).json({ error: "Failed to fetch tickets" });
    }
  });

  app.get("/api/tickets/:id", requireAuth, async (req, res) => {
    try {
      const { id } = req.params;
      const ticket = await storage.getTicketById(id);
      
      if (!ticket) {
        return res.status(404).json({ error: "Ticket not found" });
      }
      
      res.json(ticket);
    } catch (error) {
      console.error("Error fetching ticket:", error);
      res.status(500).json({ error: "Failed to fetch ticket" });
    }
  });

  app.post("/api/tickets", requireAuth, async (req, res) => {
    try {
      const validationResult = insertTicketSchema.safeParse(req.body);
      
      if (!validationResult.success) {
        const errorMessage = fromZodError(validationResult.error);
        return res.status(400).json({ 
          error: "Validation failed", 
          details: errorMessage.message 
        });
      }
      
      const ticket = await storage.createTicket(validationResult.data);
      res.status(201).json(ticket);
    } catch (error) {
      console.error("Error creating ticket:", error);
      res.status(500).json({ error: "Failed to create ticket" });
    }
  });

  app.put("/api/tickets/:id/status", requireAuth, async (req, res) => {
    try {
      const { id } = req.params;
      const { status, assignedTo } = req.body;
      
      if (!status) {
        return res.status(400).json({ error: "Status is required" });
      }
      
      const validStatuses = ["open", "in-progress", "resolved", "closed"];
      if (!validStatuses.includes(status)) {
        return res.status(400).json({ 
          error: "Invalid status", 
          validStatuses 
        });
      }
      
      const updatedTicket = await storage.updateTicketStatus(id, status, assignedTo);
      
      if (!updatedTicket) {
        return res.status(404).json({ error: "Ticket not found" });
      }
      
      res.json(updatedTicket);
    } catch (error) {
      console.error("Error updating ticket status:", error);
      res.status(500).json({ error: "Failed to update ticket status" });
    }
  });

  app.put("/api/tickets/:id", requireAuth, async (req, res) => {
    try {
      const { id } = req.params;
      const updates = req.body;
      
      delete updates.id;
      delete updates.createdAt;
      delete updates.updatedAt;
      
      const updatedTicket = await storage.updateTicket(id, updates);
      
      if (!updatedTicket) {
        return res.status(404).json({ error: "Ticket not found" });
      }
      
      res.json(updatedTicket);
    } catch (error) {
      console.error("Error updating ticket:", error);
      res.status(500).json({ error: "Failed to update ticket" });
    }
  });

  app.post("/api/contact", async (req, res) => {
    try {
      const { name, email, company, phone, serviceInterest, message } = req.body;
      
      if (!name || !email || !company || !message) {
        return res.status(400).json({ 
          error: "Missing required fields: name, email, company, message" 
        });
      }
      
      console.log("Contact form submission:", {
        name,
        email, 
        company,
        phone,
        serviceInterest,
        message,
        timestamp: new Date().toISOString()
      });
      
      res.status(200).json({ 
        message: "Contact form submitted successfully",
        id: `contact-${Date.now()}`
      });
    } catch (error) {
      console.error("Error processing contact form:", error);
      res.status(500).json({ error: "Failed to process contact form" });
    }
  });

  app.post("/api/demo-request", async (req, res) => {
    try {
      const validationResult = insertDemoRequestSchema.safeParse(req.body);
      
      if (!validationResult.success) {
        const errorMessage = fromZodError(validationResult.error);
        return res.status(400).json({ 
          error: "Validation failed", 
          details: errorMessage.message 
        });
      }
      
      const demoRequest = await storage.createDemoRequest(validationResult.data);
      
      console.log("Demo request submitted:", {
        id: demoRequest.id,
        company: validationResult.data.company,
        primaryInterest: validationResult.data.primaryInterest,
        timestamp: new Date().toISOString()
      });
      
      res.status(201).json({ 
        message: "Demo request submitted successfully",
        id: demoRequest.id
      });
    } catch (error) {
      console.error("Error processing demo request:", error);
      res.status(500).json({ error: "Failed to process demo request" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
