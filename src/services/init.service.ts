
import { connectToDatabase } from './db.service';
import Product from '../models/Product';
import Category from '../models/Category';
import Settings from '../models/Settings';
import Review from '../models/Review';
import Query from '../models/Query';

// Sample categories
const sampleCategories = [
  "Wedding Collection",
  "Hastmelap Handkerchief",
  "Astar Part Handkerchief",
  "Mindhol Handkerchief",
  "Chedachedi Handkerchief"
];

// Sample product data with images from the uploaded photos
const sampleProducts = [
  {
    name: "Wedding Handkerchief",
    category: "Wedding Collection",
    price: 1200,
    discount: 10,
    description: "Exquisite handcrafted wedding handkerchief with traditional designs for the special day.",
    images: [
      "/lovable-uploads/ddc94184-f08a-48ce-a087-b0b6b32727bb.png",
      "/lovable-uploads/322f4e4c-ace4-4eef-9871-8c53e9add343.png"
    ]
  },
  {
    name: "Hastmelap Design",
    category: "Hastmelap Handkerchief",
    price: 950,
    discount: 5,
    description: "Beautiful hastmelap design handkerchief with intricate hand-embroidered details.",
    images: [
      "/lovable-uploads/de5ef048-b294-48b3-aa7f-84aee983f176.png",
      "/lovable-uploads/8268205f-aa74-4de1-b80e-657e06d49441.png"
    ]
  },
  {
    name: "Astar Part Special",
    category: "Astar Part Handkerchief",
    price: 850,
    description: "Elegant Astar Part handkerchief with traditional motifs and designs.",
    images: [
      "/lovable-uploads/b4fb62a7-3af0-4aa3-85b3-54e78d2e1b44.png"
    ]
  },
  {
    name: "Star Pattern Mindhol",
    category: "Mindhol Handkerchief",
    price: 1100,
    discount: 15,
    description: "Beautiful star-pattern Mindhol handkerchief with traditional Hindu wedding symbols.",
    images: [
      "/lovable-uploads/89d90592-580e-4556-9d4a-df20f094315d.png",
      "/lovable-uploads/19f60e6b-0122-426d-9ecb-e8baf0717f13.png"
    ]
  },
  {
    name: "Premium Wedding Handkerchief",
    category: "Wedding Collection",
    price: 1450,
    description: "Premium quality wedding handkerchief with personalized names and wedding date.",
    images: [
      "/lovable-uploads/bda1d732-d01c-42d6-bce4-5c262e6a7907.png",
      "/lovable-uploads/b57a8228-25b6-424e-87ab-ad9af8785578.png"
    ]
  },
  {
    name: "Traditional Wedding Rumal",
    category: "Wedding Collection",
    price: 1200,
    discount: 8,
    description: "Traditional wedding rumal with customized names and marriage date.",
    images: [
      "/lovable-uploads/e0aa61ef-85cf-4b24-acdb-17bf19e7c31a.png",
      "/lovable-uploads/bf3b7974-988d-4c6e-b369-6f77696715b9.png"
    ]
  },
  {
    name: "Welcome Handkerchief",
    category: "Hastmelap Handkerchief",
    price: 980,
    description: "Special welcome handkerchief for family welcoming ceremonies, customizable with names.",
    images: [
      "/lovable-uploads/89dcf422-94fc-4eed-bc6d-f9c721dd756b.png"
    ]
  },
  {
    name: "Star Design Custom Handkerchief",
    category: "Mindhol Handkerchief",
    price: 1250,
    description: "Star-shaped design with custom name and date options for weddings and special ceremonies.",
    images: [
      "/lovable-uploads/2e8f27ad-acad-413d-985a-84e4792b9aec.png",
      "/lovable-uploads/8e70b448-e1a0-44e2-b648-327bacdbd47c.png"
    ]
  },
  {
    name: "Wedding Ceremony Special",
    category: "Chedachedi Handkerchief",
    price: 1050,
    discount: 7,
    description: "Special handkerchief for wedding ceremonies with traditional Hindu symbols and mantras.",
    images: [
      "/lovable-uploads/d05b0407-e22b-4567-9a3c-1b2be36f2334.png"
    ]
  }
];

// Sample reviews
const sampleReviews = [
  {
    userName: "Raj Patel",
    rating: 5,
    comment: "Beautiful design and excellent quality!",
    date: new Date("2023-12-15")
  },
  {
    userName: "Priya Sharma",
    rating: 4,
    comment: "Lovely handkerchief, perfect for my wedding.",
    date: new Date("2023-11-20")
  }
];

// Sample queries
const sampleQueries = [
  {
    name: "Amit Kumar",
    phone: "9876543210",
    message: "Do you customize designs for weddings?",
    status: "pending",
    date: new Date("2023-12-10")
  },
  {
    name: "Meera Singh",
    phone: "8765432109",
    message: "What's the delivery time for orders?",
    status: "done",
    date: new Date("2023-12-05")
  }
];

// Default settings
const defaultSettings = {
  whatsappNumber: "917434902998",
  instagramId: "_rk.creation1",
  phoneNumber: "917434902998",
  location: "Vadodara, Gujarat, India",
  adminUsername: "rkcreation",
  adminPassword: "Krishna@2232",
  mongoDbUrl: "mongodb+srv://harshal_050:Harshal%402772@cluster0.hchtgxj.mongodb.net/gwokdatabase?retryWrites=true&w=majority",
  cloudinaryApiKey: "",
  cloudinaryApiSecret: "",
  cloudinaryCloudName: ""
};

export const initializeDatabase = async (): Promise<void> => {
  try {
    // Connect to the database
    await connectToDatabase();
    
    // Check if we already have data
    const productsCount = await Product.countDocuments();
    const categoriesCount = await Category.countDocuments();
    
    // Only proceed if we have no data
    if (productsCount === 0 && categoriesCount === 0) {
      console.log('Initializing database with sample data...');
      
      // Insert categories
      const categoryPromises = sampleCategories.map(name => 
        new Category({ name }).save()
      );
      const savedCategories = await Promise.all(categoryPromises);
      console.log(`Added ${savedCategories.length} categories`);
      
      // Insert products
      const productPromises = sampleProducts.map(product => 
        new Product(product).save()
      );
      const savedProducts = await Promise.all(productPromises);
      console.log(`Added ${savedProducts.length} products`);
      
      // Get first product ID for reviews
      if (savedProducts.length > 0) {
        const firstProductId = savedProducts[0]._id;
        
        // Insert reviews
        const reviewPromises = sampleReviews.map(review => 
          new Review({ ...review, productId: firstProductId }).save()
        );
        await Promise.all(reviewPromises);
        console.log(`Added ${sampleReviews.length} reviews`);
      }
      
      // Insert queries
      const queryPromises = sampleQueries.map(query => 
        new Query(query).save()
      );
      await Promise.all(queryPromises);
      console.log(`Added ${sampleQueries.length} queries`);
      
      // Insert default settings if they don't exist
      const settingsCount = await Settings.countDocuments();
      if (settingsCount === 0) {
        await new Settings(defaultSettings).save();
        console.log('Added default settings');
      }
      
      console.log('Database initialization complete');
    } else {
      console.log('Database already contains data, skipping initialization');
    }
  } catch (error) {
    console.error('Database initialization error:', error);
    throw error;
  }
};
