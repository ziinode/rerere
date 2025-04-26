import { 
  products, 
  orders, 
  type Product, 
  type InsertProduct, 
  type Order, 
  type InsertOrder 
} from "@shared/schema";

export interface IStorage {
  getProducts(): Promise<Product[]>;
  getProduct(id: number): Promise<Product | undefined>;
  getProductsByCategory(category: string): Promise<Product[]>;
  createOrder(order: InsertOrder): Promise<Order>;
}

export class MemStorage implements IStorage {
  private products: Map<number, Product>;
  private orders: Map<number, Order>;
  private productIdCounter: number;
  private orderIdCounter: number;

  constructor() {
    this.products = new Map();
    this.orders = new Map();
    this.productIdCounter = 1;
    this.orderIdCounter = 1;

    // Seed with initial products
    this.seedProducts();
  }

  async getProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  async getProduct(id: number): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    return Array.from(this.products.values()).filter(
      (product) => product.category === category
    );
  }

  async createOrder(insertOrder: InsertOrder): Promise<Order> {
    const id = this.orderIdCounter++;
    const order: Order = { ...insertOrder, id };
    this.orders.set(id, order);
    return order;
  }

  private seedProducts() {
    const productsSeed: InsertProduct[] = [
      {
        name: "Klasiskais T-krekls",
        description: "Mūsu klasiskais T-krekls ar minimālistisku dizainu ir ideāli piemērots ikdienas valkāšanai. Izgatavots no augstas kvalitātes kokvilnas, kas nodrošina maksimālu komfortu un izturību.",
        price: 24.99,
        material: "Melns, 100% kokvilna",
        category: "viriesi",
        sizes: ["XS", "S", "M", "L", "XL", "XXL"],
        colors: ["#000000", "#FFFFFF", "#808080"],
        images: [
          "https://images.unsplash.com/photo-1581655353564-df123a1eb820?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80"
        ],
        isNew: false,
        isSale: false
      },
      {
        name: "Oversize T-krekls",
        description: "Plats un ērts T-krekls brīvai valkāšanai. Piegriezts no mīkstas, augstas kvalitātes kokvilnas, kas nodrošina komfortu visas dienas garumā.",
        price: 29.99,
        material: "Balts, 100% kokvilna",
        category: "viriesi",
        sizes: ["S", "M", "L", "XL", "XXL"],
        colors: ["#000000", "#FFFFFF", "#808080"],
        images: [
          "https://images.unsplash.com/photo-1583744946564-b52ac1c389c8?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80"
        ],
        isNew: false,
        isSale: false
      },
      {
        name: "Premium T-krekls",
        description: "Augstas kvalitātes premium T-krekls no organiskās kokvilnas. Ideāli piemērots gan ikdienas, gan elegantam stilam.",
        price: 34.99,
        material: "Pelēks, organiskā kokvilna",
        category: "unisex",
        sizes: ["XS", "S", "M", "L", "XL"],
        colors: ["#000000", "#FFFFFF", "#808080"],
        images: [
          "https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-4.0.3&auto=format&fit=crop&w=764&q=80"
        ],
        isNew: true,
        isSale: false
      },
      {
        name: "Slim Fit T-krekls",
        description: "Pieguļošs slim fit T-krekls, kas labi izskatīsies uz jebkuras figūras. Elastīgais materiāls nodrošina komfortu un brīvību kustībās.",
        price: 26.99,
        material: "Melns, 95% kokvilna, 5% elastāns",
        category: "viriesi",
        sizes: ["S", "M", "L", "XL"],
        colors: ["#000000", "#FFFFFF"],
        images: [
          "https://images.unsplash.com/photo-1554568218-0f1715e72254?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80"
        ],
        isNew: false,
        isSale: false
      },
      {
        name: "Basic T-krekls",
        description: "Vienkāršs un ērts pamata T-krekls ikdienas valkāšanai. Piegriezts no mīkstas kokvilnas, nodrošinot komfortu visas dienas garumā.",
        price: 19.99,
        discountPrice: 24.99,
        material: "Balts, 100% kokvilna",
        category: "unisex",
        sizes: ["XS", "S", "M", "L", "XL", "XXL"],
        colors: ["#000000", "#FFFFFF", "#808080"],
        images: [
          "https://images.unsplash.com/photo-1596609548086-85bbf8ddb6b9?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80"
        ],
        isNew: false,
        isSale: true
      },
      {
        name: "Minimālistisks T-krekls",
        description: "Tīrs un minimālistisks T-krekls ar elegantu dizainu. Universāls apģērbs, kas der gan ikdienā, gan iziešanai.",
        price: 22.99,
        material: "Pelēks, 100% kokvilna",
        category: "sievietes",
        sizes: ["XS", "S", "M", "L"],
        colors: ["#000000", "#FFFFFF", "#808080"],
        images: [
          "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=880&q=80"
        ],
        isNew: false,
        isSale: false
      }
    ];

    productsSeed.forEach(product => {
      const id = this.productIdCounter++;
      this.products.set(id, { ...product, id });
    });
  }
}

export const storage = new MemStorage();
