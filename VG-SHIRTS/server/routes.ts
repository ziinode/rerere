import express, { type Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertOrderSchema, cartItemSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes
  const apiRouter = express.Router();
  
  // Get all products
  apiRouter.get("/products", async (req: Request, res: Response) => {
    try {
      const products = await storage.getProducts();
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: "Kļūda iegūstot produktus" });
    }
  });
  
  // Get products by category - this route needs to be before the :id route
  apiRouter.get("/products/category/:category", async (req: Request, res: Response) => {
    try {
      const { category } = req.params;
      const products = await storage.getProductsByCategory(category);
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: "Kļūda iegūstot produktus" });
    }
  });
  
  // Get product by ID
  apiRouter.get("/products/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        return res.status(400).json({ message: "Nederīgs produkta ID" });
      }
      
      const product = await storage.getProduct(id);
      
      if (!product) {
        return res.status(404).json({ message: "Produkts nav atrasts" });
      }
      
      res.json(product);
    } catch (error) {
      res.status(500).json({ message: "Kļūda iegūstot produktu" });
    }
  });
  
  // Create order
  apiRouter.post("/orders", async (req: Request, res: Response) => {
    try {
      // Validate the order data
      const orderData = insertOrderSchema.parse(req.body);
      
      // Validate each cart item in the order
      const items = z.array(cartItemSchema).parse(orderData.items);
      
      // Create the order
      const order = await storage.createOrder(orderData);
      
      res.status(201).json(order);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Nederīgi pasūtījuma dati", 
          errors: error.errors 
        });
      }
      
      res.status(500).json({ message: "Kļūda izveidojot pasūtījumu" });
    }
  });

  // Register the API router
  app.use("/api", apiRouter);

  const httpServer = createServer(app);
  return httpServer;
}
