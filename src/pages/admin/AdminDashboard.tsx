
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Layout, 
  LayoutContent, 
  LayoutHeader 
} from "@/components/layout/Layout";
import { 
  ShoppingBag, 
  MessageSquare, 
  Star, 
  BarChart, 
  Settings,
  LogOut,
  Plus,
  Search,
  Filter,
  Edit,
  Trash,
  Check
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { 
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter, SheetClose } from "@/components/ui/sheet";

// Mock data for the dashboard
const mockStats = {
  totalProducts: 24,
  totalReviews: 48,
  averageRating: 4.7,
  pendingQueries: 3
};

// Mock categories for products
const mockCategories = [
  "Wedding Collection",
  "Hastmelap Handkerchief",
  "Astar Part Handkerchief",
  "Mindhol Handkerchief",
  "Chedachedi Handkerchief"
];

// Mock products data
const mockProducts = [
  {
    id: "1",
    name: "Wedding Handkerchief",
    category: "Wedding Collection",
    price: 1200,
    discountPrice: 1080,
    description: "Exquisite handcrafted wedding handkerchief",
    images: [
      "https://images.unsplash.com/photo-1606293459303-ec4d6a10b829?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
    ]
  },
  {
    id: "2",
    name: "Hastmelap Design",
    category: "Hastmelap Handkerchief",
    price: 950,
    discountPrice: 902,
    description: "Beautiful hastmelap design handkerchief",
    images: [
      "https://images.unsplash.com/photo-1589810635657-232948472d98?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
    ]
  },
];

// Mock reviews data
const mockReviews = [
  {
    id: "1",
    productId: "1",
    userName: "Raj Patel",
    rating: 5,
    comment: "Beautiful design and excellent quality!",
    date: "2023-12-15"
  },
  {
    id: "2",
    productId: "1",
    userName: "Priya Sharma",
    rating: 4,
    comment: "Lovely handkerchief, perfect for my wedding.",
    date: "2023-11-20"
  },
];

// Mock queries data
const mockQueries = [
  {
    id: "1",
    name: "Amit Kumar",
    phone: "9876543210",
    message: "Do you customize designs for weddings?",
    status: "pending",
    date: "2023-12-10"
  },
  {
    id: "2",
    name: "Meera Singh",
    phone: "8765432109",
    message: "What's the delivery time for orders?",
    status: "done",
    date: "2023-12-05"
  },
];

// Contact details for settings
const mockSettings = {
  whatsappNumber: "917434902998",
  instagramId: "_rk.creation1",
  phoneNumber: "917434902998",
  location: "Vadodara, Gujarat, India",
  adminUsername: "rkcreation",
  adminPassword: "Krishna@2232"
};

const AdminDashboard = () => {
  const [stats, setStats] = useState(mockStats);
  const [activeTab, setActiveTab] = useState("overview");
  const [categories, setCategories] = useState(mockCategories);
  const [products, setProducts] = useState(mockProducts);
  const [reviews, setReviews] = useState(mockReviews);
  const [queries, setQueries] = useState(mockQueries);
  const [settings, setSettings] = useState(mockSettings);
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false);
  const [isEditProductOpen, setIsEditProductOpen] = useState(false);
  const [isEditReviewOpen, setIsEditReviewOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedReview, setSelectedReview] = useState(null);
  const [newCategory, setNewCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  // New product form state
  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "",
    price: "",
    discountPrice: "",
    description: "",
    images: []
  });

  useEffect(() => {
    // Check if admin is logged in
    const isLoggedIn = localStorage.getItem("adminLoggedIn") === "true";
    if (!isLoggedIn) {
      navigate("/admin/login");
    }
    
    // In a real app, you would fetch real stats here
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("adminLoggedIn");
    toast.success("Logged out successfully");
    navigate("/admin/login");
  };

  const handleAddCategory = () => {
    if (newCategory.trim() === "") {
      toast.error("Please enter a category name");
      return;
    }
    
    if (categories.includes(newCategory)) {
      toast.error("This category already exists");
      return;
    }
    
    setCategories([...categories, newCategory]);
    setNewCategory("");
    setIsAddCategoryOpen(false);
    toast.success("Category added successfully");
  };

  const handleAddProduct = () => {
    // Validation
    if (!newProduct.name || !newProduct.category || !newProduct.price || !newProduct.description) {
      toast.error("Please fill in all required fields");
      return;
    }

    const productToAdd = {
      id: (products.length + 1).toString(),
      name: newProduct.name,
      category: newProduct.category,
      price: parseFloat(newProduct.price),
      discountPrice: newProduct.discountPrice ? parseFloat(newProduct.discountPrice) : parseFloat(newProduct.price),
      description: newProduct.description,
      images: newProduct.images.length > 0 ? newProduct.images : ["https://placehold.co/400x400?text=No+Image"]
    };

    setProducts([...products, productToAdd]);
    
    // Reset form
    setNewProduct({
      name: "",
      category: "",
      price: "",
      discountPrice: "",
      description: "",
      images: []
    });
    
    setIsAddProductOpen(false);
    toast.success("Product added successfully");
  };

  const handleDeleteProduct = (id) => {
    setProducts(products.filter(product => product.id !== id));
    toast.success("Product deleted successfully");
  };

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    setIsEditProductOpen(true);
  };

  const handleSaveEditedProduct = () => {
    setProducts(products.map(product => 
      product.id === selectedProduct.id ? selectedProduct : product
    ));
    setIsEditProductOpen(false);
    toast.success("Product updated successfully");
  };

  const handleDeleteReview = (id) => {
    setReviews(reviews.filter(review => review.id !== id));
    toast.success("Review deleted successfully");
  };

  const handleEditReview = (review) => {
    setSelectedReview(review);
    setIsEditReviewOpen(true);
  };

  const handleSaveEditedReview = () => {
    setReviews(reviews.map(review => 
      review.id === selectedReview.id ? selectedReview : review
    ));
    setIsEditReviewOpen(false);
    toast.success("Review updated successfully");
  };

  const handleUpdateQueryStatus = (id, newStatus) => {
    setQueries(queries.map(query => 
      query.id === id ? { ...query, status: newStatus } : query
    ));
    toast.success(`Query marked as ${newStatus}`);
  };

  const handleSaveSettings = () => {
    // In a real app, this would make an API call to update settings
    toast.success("Settings updated successfully");
  };

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sidebarItems = [
    { id: "overview", label: "Dashboard", icon: BarChart },
    { id: "products", label: "Products", icon: ShoppingBag },
    { id: "reviews", label: "Reviews & Ratings", icon: Star },
    { id: "queries", label: "User Queries", icon: MessageSquare },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-secondary/20">
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <div className="w-64 bg-card border-r border-border hidden md:block">
          <div className="p-4 flex items-center justify-center border-b border-border">
            <img 
              src="/lovable-uploads/9b5842dd-9df6-4558-b7b1-8f96bda04cce.png" 
              alt="RK.Creation Logo" 
              className="h-10 w-10 rounded-full mr-2"
            />
            <span className="font-semibold text-lg">Admin Panel</span>
          </div>
          <nav className="p-4">
            <ul className="space-y-2">
              {sidebarItems.map(item => (
                <li key={item.id}>
                  <button
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center p-3 rounded-md transition-colors ${
                      activeTab === item.id 
                        ? 'bg-primary/10 text-primary' 
                        : 'hover:bg-secondary text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <item.icon size={18} className="mr-2" />
                    <span>{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
            <div className="mt-8 pt-4 border-t border-border">
              <button
                onClick={handleLogout}
                className="w-full flex items-center p-3 rounded-md text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
              >
                <LogOut size={18} className="mr-2" />
                <span>Logout</span>
              </button>
            </div>
          </nav>
        </div>
        
        {/* Main content */}
        <div className="flex-1 overflow-auto">
          <header className="bg-card border-b border-border p-4 flex justify-between items-center">
            <h1 className="text-xl font-semibold">
              {sidebarItems.find(item => item.id === activeTab)?.label || "Dashboard"}
            </h1>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="md:hidden"
                onClick={() => alert("Mobile menu not implemented")}
              >
                Menu
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={handleLogout}
                className="hidden sm:flex"
              >
                <LogOut size={16} className="mr-2" />
                Logout
              </Button>
            </div>
          </header>
          
          <main className="p-6">
            {activeTab === "overview" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      Total Products
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center">
                      <ShoppingBag className="mr-2 text-muted-foreground" />
                      <span className="text-2xl font-bold">{products.length}</span>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      Customer Reviews
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center">
                      <MessageSquare className="mr-2 text-muted-foreground" />
                      <span className="text-2xl font-bold">{reviews.length}</span>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      Average Rating
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center">
                      <Star className="mr-2 text-amber-500" />
                      <span className="text-2xl font-bold">
                        {reviews.length > 0 
                          ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1) 
                          : "N/A"}
                      </span>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      Pending Queries
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center">
                      <MessageSquare className="mr-2 text-muted-foreground" />
                      <span className="text-2xl font-bold">
                        {queries.filter(q => q.status === "pending").length}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
            
            {/* Products Management */}
            {activeTab === "products" && (
              <div className="space-y-6">
                <div className="bg-card p-6 rounded-lg">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                    <h2 className="text-xl font-semibold">Products Management</h2>
                    <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                      <div className="relative w-full sm:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                        <Input
                          placeholder="Search products..."
                          className="pl-10"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                      </div>
                      <Button onClick={() => setIsAddProductOpen(true)}>
                        <Plus size={16} className="mr-2" />
                        Add Product
                      </Button>
                    </div>
                  </div>
                  
                  {filteredProducts.length > 0 ? (
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Discount</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredProducts.map((product) => (
                            <TableRow key={product.id}>
                              <TableCell className="font-medium">{product.name}</TableCell>
                              <TableCell>{product.category}</TableCell>
                              <TableCell>₹{product.price}</TableCell>
                              <TableCell>
                                {product.discountPrice !== product.price 
                                  ? `₹${product.discountPrice} (${Math.round((1 - product.discountPrice / product.price) * 100)}% off)` 
                                  : "-"}
                              </TableCell>
                              <TableCell className="text-right">
                                <div className="flex justify-end gap-2">
                                  <Button variant="outline" size="sm" onClick={() => handleEditProduct(product)}>
                                    <Edit size={14} />
                                  </Button>
                                  <Button variant="destructive" size="sm" onClick={() => handleDeleteProduct(product.id)}>
                                    <Trash size={14} />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  ) : (
                    <div className="text-center py-10">
                      <p className="text-muted-foreground">No products found. Add your first product!</p>
                    </div>
                  )}
                </div>
                
                {/* Category Management */}
                <div className="bg-card p-6 rounded-lg">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">Categories</h2>
                    <Button onClick={() => setIsAddCategoryOpen(true)}>
                      <Plus size={16} className="mr-2" />
                      Add Category
                    </Button>
                  </div>
                  
                  <div className="flex flex-wrap gap-3">
                    {categories.map((category) => (
                      <div key={category} className="bg-secondary text-secondary-foreground px-4 py-2 rounded-full text-sm">
                        {category}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            
            {/* Reviews & Ratings Management */}
            {activeTab === "reviews" && (
              <div className="bg-card p-6 rounded-lg">
                <h2 className="text-xl font-semibold mb-6">Reviews & Ratings</h2>
                
                {reviews.length > 0 ? (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Product</TableHead>
                          <TableHead>User</TableHead>
                          <TableHead>Rating</TableHead>
                          <TableHead>Comment</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {reviews.map((review) => (
                          <TableRow key={review.id}>
                            <TableCell className="font-medium">
                              {products.find(p => p.id === review.productId)?.name || "Unknown Product"}
                            </TableCell>
                            <TableCell>{review.userName}</TableCell>
                            <TableCell>
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <Star 
                                    key={i} 
                                    size={16} 
                                    className={i < review.rating ? 'text-amber-500 fill-amber-500' : 'text-muted-foreground'} 
                                  />
                                ))}
                              </div>
                            </TableCell>
                            <TableCell className="max-w-[200px] truncate">{review.comment}</TableCell>
                            <TableCell>{review.date}</TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <Button variant="outline" size="sm" onClick={() => handleEditReview(review)}>
                                  <Edit size={14} />
                                </Button>
                                <Button variant="destructive" size="sm" onClick={() => handleDeleteReview(review.id)}>
                                  <Trash size={14} />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <div className="text-center py-10">
                    <p className="text-muted-foreground">No reviews yet.</p>
                  </div>
                )}
              </div>
            )}
            
            {/* User Queries Management */}
            {activeTab === "queries" && (
              <div className="bg-card p-6 rounded-lg">
                <h2 className="text-xl font-semibold mb-6">User Queries</h2>
                
                {queries.length > 0 ? (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Phone</TableHead>
                          <TableHead>Message</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {queries.map((query) => (
                          <TableRow key={query.id}>
                            <TableCell className="font-medium">{query.name}</TableCell>
                            <TableCell>{query.phone}</TableCell>
                            <TableCell className="max-w-[200px] truncate">{query.message}</TableCell>
                            <TableCell>{query.date}</TableCell>
                            <TableCell>
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                query.status === 'pending' 
                                  ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-500' 
                                  : 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-500'
                              }`}>
                                {query.status === 'pending' ? 'Pending' : 'Done'}
                              </span>
                            </TableCell>
                            <TableCell className="text-right">
                              {query.status === 'pending' ? (
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  className="text-green-600" 
                                  onClick={() => handleUpdateQueryStatus(query.id, 'done')}
                                >
                                  <Check size={14} className="mr-1" />
                                  Mark as Done
                                </Button>
                              ) : (
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  onClick={() => handleUpdateQueryStatus(query.id, 'pending')}
                                >
                                  Mark as Pending
                                </Button>
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <div className="text-center py-10">
                    <p className="text-muted-foreground">No user queries yet.</p>
                  </div>
                )}
              </div>
            )}
            
            {/* Settings Section */}
            {activeTab === "settings" && (
              <div className="bg-card p-6 rounded-lg max-w-3xl mx-auto">
                <h2 className="text-xl font-semibold mb-6">Settings</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-base font-medium mb-4">Admin Credentials</h3>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="block text-sm font-medium text-muted-foreground mb-1">
                          Username
                        </label>
                        <Input 
                          value={settings.adminUsername} 
                          onChange={(e) => setSettings({...settings, adminUsername: e.target.value})}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-muted-foreground mb-1">
                          Password
                        </label>
                        <Input 
                          type="password" 
                          value={settings.adminPassword} 
                          onChange={(e) => setSettings({...settings, adminPassword: e.target.value})}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-base font-medium mb-4">Contact Information</h3>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="block text-sm font-medium text-muted-foreground mb-1">
                          WhatsApp Number
                        </label>
                        <Input 
                          value={settings.whatsappNumber} 
                          onChange={(e) => setSettings({...settings, whatsappNumber: e.target.value})}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-muted-foreground mb-1">
                          Phone Number
                        </label>
                        <Input 
                          value={settings.phoneNumber} 
                          onChange={(e) => setSettings({...settings, phoneNumber: e.target.value})}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-muted-foreground mb-1">
                          Instagram ID
                        </label>
                        <Input 
                          value={settings.instagramId} 
                          onChange={(e) => setSettings({...settings, instagramId: e.target.value})}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-muted-foreground mb-1">
                          Location
                        </label>
                        <Input 
                          value={settings.location} 
                          onChange={(e) => setSettings({...settings, location: e.target.value})}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <Button onClick={handleSaveSettings} className="mt-4">
                    Save Settings
                  </Button>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
      
      {/* Add Category Sheet */}
      <Sheet open={isAddCategoryOpen} onOpenChange={setIsAddCategoryOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Add New Category</SheetTitle>
            <SheetDescription>
              Add a new product category to your store.
            </SheetDescription>
          </SheetHeader>
          
          <div className="space-y-4 py-6">
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1">
                Category Name
              </label>
              <Input 
                value={newCategory} 
                onChange={(e) => setNewCategory(e.target.value)}
                placeholder="Enter category name"
              />
            </div>
          </div>
          
          <SheetFooter>
            <Button onClick={handleAddCategory} disabled={!newCategory.trim()}>
              Save Category
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
      
      {/* Add Product Sheet */}
      <Sheet open={isAddProductOpen} onOpenChange={setIsAddProductOpen}>
        <SheetContent className="sm:max-w-md overflow-auto">
          <SheetHeader>
            <SheetTitle>Add New Product</SheetTitle>
            <SheetDescription>
              Add a new product to your store.
            </SheetDescription>
          </SheetHeader>
          
          <div className="space-y-4 py-6">
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1">
                Product Name *
              </label>
              <Input 
                value={newProduct.name} 
                onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                placeholder="Enter product name"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1">
                Category *
              </label>
              <select 
                className="w-full p-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring bg-background"
                value={newProduct.category} 
                onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
              >
                <option value="">Select a category</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-1">
                  Price (₹) *
                </label>
                <Input 
                  type="number"
                  value={newProduct.price} 
                  onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                  placeholder="Enter price"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-1">
                  Discount Price (₹)
                </label>
                <Input 
                  type="number"
                  value={newProduct.discountPrice} 
                  onChange={(e) => setNewProduct({...newProduct, discountPrice: e.target.value})}
                  placeholder="Enter discount price"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1">
                Description *
              </label>
              <textarea 
                className="w-full p-2 border border-input rounded-md min-h-[100px] focus:outline-none focus:ring-2 focus:ring-ring bg-background"
                value={newProduct.description} 
                onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                placeholder="Enter product description"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1">
                Image URLs
              </label>
              <Input 
                value={newProduct.images.join(", ")} 
                onChange={(e) => setNewProduct({...newProduct, images: e.target.value.split(",").map(url => url.trim())})}
                placeholder="Enter image URLs separated by commas"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Enter URLs separated by commas
              </p>
            </div>
          </div>
          
          <SheetFooter>
            <SheetClose asChild>
              <Button variant="outline">Cancel</Button>
            </SheetClose>
            <Button onClick={handleAddProduct}>
              Add Product
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
      
      {/* Edit Product Sheet */}
      <Sheet open={isEditProductOpen && selectedProduct} onOpenChange={setIsEditProductOpen}>
        <SheetContent className="sm:max-w-md overflow-auto">
          <SheetHeader>
            <SheetTitle>Edit Product</SheetTitle>
            <SheetDescription>
              Make changes to the product.
            </SheetDescription>
          </SheetHeader>
          
          {selectedProduct && (
            <div className="space-y-4 py-6">
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-1">
                  Product Name
                </label>
                <Input 
                  value={selectedProduct.name} 
                  onChange={(e) => setSelectedProduct({...selectedProduct, name: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-1">
                  Category
                </label>
                <select 
                  className="w-full p-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring bg-background"
                  value={selectedProduct.category} 
                  onChange={(e) => setSelectedProduct({...selectedProduct, category: e.target.value})}
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-1">
                    Price (₹)
                  </label>
                  <Input 
                    type="number"
                    value={selectedProduct.price} 
                    onChange={(e) => setSelectedProduct({...selectedProduct, price: parseFloat(e.target.value)})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-1">
                    Discount Price (₹)
                  </label>
                  <Input 
                    type="number"
                    value={selectedProduct.discountPrice} 
                    onChange={(e) => setSelectedProduct({...selectedProduct, discountPrice: parseFloat(e.target.value)})}
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-1">
                  Description
                </label>
                <textarea 
                  className="w-full p-2 border border-input rounded-md min-h-[100px] focus:outline-none focus:ring-2 focus:ring-ring bg-background"
                  value={selectedProduct.description} 
                  onChange={(e) => setSelectedProduct({...selectedProduct, description: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-1">
                  Image URLs
                </label>
                <Input 
                  value={selectedProduct.images.join(", ")} 
                  onChange={(e) => setSelectedProduct({...selectedProduct, images: e.target.value.split(",").map(url => url.trim())})}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Enter URLs separated by commas
                </p>
              </div>
            </div>
          )}
          
          <SheetFooter>
            <SheetClose asChild>
              <Button variant="outline">Cancel</Button>
            </SheetClose>
            <Button onClick={handleSaveEditedProduct}>
              Save Changes
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
      
      {/* Edit Review Sheet */}
      <Sheet open={isEditReviewOpen && selectedReview} onOpenChange={setIsEditReviewOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Edit Review</SheetTitle>
            <SheetDescription>
              Make changes to the customer review.
            </SheetDescription>
          </SheetHeader>
          
          {selectedReview && (
            <div className="space-y-4 py-6">
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-1">
                  User Name
                </label>
                <Input 
                  value={selectedReview.userName} 
                  onChange={(e) => setSelectedReview({...selectedReview, userName: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-1">
                  Rating
                </label>
                <select 
                  className="w-full p-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring bg-background"
                  value={selectedReview.rating} 
                  onChange={(e) => setSelectedReview({...selectedReview, rating: parseInt(e.target.value)})}
                >
                  {[1, 2, 3, 4, 5].map(rating => (
                    <option key={rating} value={rating}>{rating} Star{rating > 1 ? 's' : ''}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-1">
                  Comment
                </label>
                <textarea 
                  className="w-full p-2 border border-input rounded-md min-h-[100px] focus:outline-none focus:ring-2 focus:ring-ring bg-background"
                  value={selectedReview.comment} 
                  onChange={(e) => setSelectedReview({...selectedReview, comment: e.target.value})}
                />
              </div>
            </div>
          )}
          
          <SheetFooter>
            <SheetClose asChild>
              <Button variant="outline">Cancel</Button>
            </SheetClose>
            <Button onClick={handleSaveEditedReview}>
              Save Changes
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default AdminDashboard;
