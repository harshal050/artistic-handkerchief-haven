import { useState, useEffect, useRef } from "react";
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
  Check,
  Upload,
  Users,
  Database,
  Image as ImageIcon,
  Menu,
  X,
  ChevronRight,
  PieChart as LucidePieChart,
  BarChart2,
  LineChart as LucideLineChart,
  User
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
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
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const mockStats = {
  totalProducts: 24,
  totalReviews: 48,
  averageRating: 4.7,
  pendingQueries: 3,
  totalVisits: 1246,
  totalUsers: 87
};

const mockCategories = [
  "Wedding Collection",
  "Hastmelap Handkerchief",
  "Astar Part Handkerchief",
  "Mindhol Handkerchief",
  "Chedachedi Handkerchief"
];

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

const mockRatingData = [
  { name: '5 Stars', value: 25 },
  { name: '4 Stars', value: 15 },
  { name: '3 Stars', value: 8 },
  { name: '2 Stars', value: 4 },
  { name: '1 Star', value: 2 },
];

const mockVisitData = [
  { name: 'Mon', visits: 120 },
  { name: 'Tue', visits: 145 },
  { name: 'Wed', visits: 132 },
  { name: 'Thu', visits: 167 },
  { name: 'Fri', visits: 189 },
  { name: 'Sat', visits: 212 },
  { name: 'Sun', visits: 198 },
];

const mockProductViewData = [
  { name: 'Wedding Collection', views: 234 },
  { name: 'Hastmelap', views: 178 },
  { name: 'Astar Part', views: 162 },
  { name: 'Mindhol', views: 145 },
  { name: 'Chedachedi', views: 132 },
];

const mockSettings = {
  whatsappNumber: "917434902998",
  instagramId: "_rk.creation1",
  phoneNumber: "917434902998",
  location: "Vadodara, Gujarat, India",
  adminUsername: "rkcreation",
  adminPassword: "Krishna@2232",
  mongoDbUrl: "",
  cloudinaryApiKey: "",
  cloudinaryApiSecret: "",
  cloudinaryCloudName: ""
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const fileInputRef = useRef(null);

  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "",
    price: "",
    discountPrice: "",
    description: "",
    images: []
  });

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("adminLoggedIn") === "true";
    if (!isLoggedIn) {
      navigate("/admin/login");
    }
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

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    
    setUploading(true);
    
    setTimeout(() => {
      const mockUploadedUrls = files.map(file => 
        URL.createObjectURL(file as Blob)
      );
      
      if (isEditProductOpen && selectedProduct) {
        setSelectedProduct({
          ...selectedProduct,
          images: [...selectedProduct.images, ...mockUploadedUrls]
        });
      } else {
        setNewProduct({
          ...newProduct,
          images: [...newProduct.images, ...mockUploadedUrls]
        });
      }
      
      setSelectedFiles([...selectedFiles, ...files]);
      setUploading(false);
      toast.success(`${files.length} image(s) uploaded successfully`);
    }, 1500);
  };

  const handleAddProduct = () => {
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
    
    setNewProduct({
      name: "",
      category: "",
      price: "",
      discountPrice: "",
      description: "",
      images: []
    });
    
    setSelectedFiles([]);
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
    toast.success("Settings updated successfully");
  };

  const handleRemoveImage = (indexToRemove, isEditing = false) => {
    if (isEditing && selectedProduct) {
      const updatedImages = selectedProduct.images.filter((_, index) => index !== indexToRemove);
      setSelectedProduct({
        ...selectedProduct,
        images: updatedImages
      });
    } else {
      const updatedImages = newProduct.images.filter((_, index) => index !== indexToRemove);
      setNewProduct({
        ...newProduct,
        images: updatedImages
      });
    }
    toast.success("Image removed");
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
      <div className="flex min-h-screen flex-col md:flex-row">
        <div className="md:hidden bg-card border-b border-border p-4 flex justify-between items-center sticky top-0 z-30">
          <div className="flex items-center">
            <img 
              src="/lovable-uploads/9b5842dd-9df6-4558-b7b1-8f96bda04cce.png" 
              alt="RK.Creation Logo" 
              className="h-8 w-8 rounded-full mr-2"
            />
            <span className="font-semibold text-lg">Admin Panel</span>
          </div>
          <Button 
            variant="outline" 
            size="icon" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>
        </div>
        
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetContent side="left" className="w-[250px] sm:w-[300px] p-0">
            <div className="flex flex-col h-full">
              <div className="p-4 flex items-center justify-center border-b border-border">
                <img 
                  src="/lovable-uploads/9b5842dd-9df6-4558-b7b1-8f96bda04cce.png" 
                  alt="RK.Creation Logo" 
                  className="h-8 w-8 rounded-full mr-2"
                />
                <span className="font-semibold text-lg">Admin Panel</span>
              </div>
              <nav className="flex-1 overflow-auto p-4">
                <ul className="space-y-2">
                  {sidebarItems.map(item => (
                    <li key={item.id}>
                      <button
                        onClick={() => {
                          setActiveTab(item.id);
                          setIsMobileMenuOpen(false);
                        }}
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
              </nav>
              <div className="p-4 border-t border-border">
                <Button
                  onClick={handleLogout}
                  className="w-full"
                  variant="destructive"
                >
                  <LogOut size={16} className="mr-2" />
                  Logout
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
        
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
        
        <div className="flex-1 overflow-auto">
          <header className="bg-card border-b border-border p-4 flex justify-between items-center hidden md:flex">
            <h1 className="text-xl font-semibold">
              {sidebarItems.find(item => item.id === activeTab)?.label || "Dashboard"}
            </h1>
            <div className="flex items-center gap-2">
              <Button
                variant="destructive"
                size="sm"
                onClick={handleLogout}
              >
                <LogOut size={16} className="mr-2" />
                Logout
              </Button>
            </div>
          </header>
          
          <main className="p-4 md:p-6">
            {activeTab === "overview" && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-6">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground">
                        Total Products
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center">
                        <ShoppingBag className="mr-2 text-muted-foreground" size={16} />
                        <span className="text-xl md:text-2xl font-bold">{products.length}</span>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground">
                        Reviews
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center">
                        <MessageSquare className="mr-2 text-muted-foreground" size={16} />
                        <span className="text-xl md:text-2xl font-bold">{reviews.length}</span>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground">
                        Avg Rating
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center">
                        <Star className="mr-2 text-amber-500" size={16} />
                        <span className="text-xl md:text-2xl font-bold">
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
                        <MessageSquare className="mr-2 text-muted-foreground" size={16} />
                        <span className="text-xl md:text-2xl font-bold">
                          {queries.filter(q => q.status === "pending").length}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground">
                        Total Visits
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center">
                        <Users className="mr-2 text-muted-foreground" size={16} />
                        <span className="text-xl md:text-2xl font-bold">{stats.totalVisits}</span>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground">
                        Total Users
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center">
                        <User className="mr-2 text-muted-foreground" size={16} />
                        <span className="text-xl md:text-2xl font-bold">{stats.totalUsers}</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Rating Distribution</CardTitle>
                      <CardDescription>Distribution of user ratings</CardDescription>
                    </CardHeader>
                    <CardContent className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={mockRatingData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            nameKey="name"
                            label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          >
                            {mockRatingData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Legend />
                          <RechartsTooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Weekly Visits</CardTitle>
                      <CardDescription>Website traffic for the past week</CardDescription>
                    </CardHeader>
                    <CardContent className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                          data={mockVisitData}
                          margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                          }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <RechartsTooltip />
                          <Legend />
                          <Line type="monotone" dataKey="visits" stroke="#8884d8" activeDot={{ r: 8 }} />
                        </LineChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                  
                  <Card className="lg:col-span-2">
                    <CardHeader>
                      <CardTitle>Product Category Views</CardTitle>
                      <CardDescription>Number of views per product category</CardDescription>
                    </CardHeader>
                    <CardContent className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <RechartsBarChart
                          data={mockProductViewData}
                          margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                          }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <RechartsTooltip />
                          <Legend />
                          <Bar dataKey="views" fill="#8884d8" />
                        </RechartsBarChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
            
            {activeTab === "products" && (
              <div className="space-y-6">
                <div className="bg-card p-4 md:p-6 rounded-lg">
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
                            <TableHead className="hidden md:table-cell">Category</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead className="hidden md:table-cell">Discount</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredProducts.map((product) => (
                            <TableRow key={product.id}>
                              <TableCell className="font-medium">{product.name}</TableCell>
                              <TableCell className="hidden md:table-cell">{product.category}</TableCell>
                              <TableCell>₹{product.price}</TableCell>
                              <TableCell className="hidden md:table-cell">
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
                
                <div className="bg-card p-4 md:p-6 rounded-lg">
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
            
            {activeTab === "reviews" && (
              <div className="bg-card p-4 md:p-6 rounded-lg">
                <h2 className="text-xl font-semibold mb-6">Reviews & Ratings</h2>
                
                {reviews.length > 0 ? (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Product</TableHead>
                          <TableHead>User</TableHead>
                          <TableHead>Rating</TableHead>
                          <TableHead className="hidden md:table-cell">Comment</TableHead>
                          <TableHead className="hidden md:table-cell">Date</TableHead>
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
                            <TableCell className="max-w-[200px] truncate hidden md:table-cell">
                              {review.comment}
                            </TableCell>
                            <TableCell className="hidden md:table-cell">{review.date}</TableCell>
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
            
            {activeTab === "queries" && (
              <div className="bg-card p-4 md:p-6 rounded-lg">
                <h2 className="text-xl font-semibold mb-6">User Queries</h2>
                
                {queries.length > 0 ? (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead className="hidden md:table-cell">Phone</TableHead>
                          <TableHead>Message</TableHead>
                          <TableHead className="hidden md:table-cell">Date</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {queries.map((query) => (
                          <TableRow key={query.id}>
                            <TableCell className="font-medium">{query.name}</TableCell>
                            <TableCell className="hidden md:table-cell">{query.phone}</TableCell>
                            <TableCell className="max-w-[200px] truncate">
                              {query.message}
                            </TableCell>
                            <TableCell className="hidden md:table-cell">{query.date}</TableCell>
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
                                  <Check size={14} className="md:mr-1" />
                                  <span className="hidden md:inline">Mark as Done</span>
                                </Button>
                              ) : (
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  onClick={() => handleUpdateQueryStatus(query.id, 'pending')}
                                >
                                  <span className="hidden md:inline">Mark as Pending</span>
                                  <span className="md:hidden">Pending</span>
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
            
            {activeTab === "settings" && (
              <div className="bg-card p-4 md:p-6 rounded-lg max-w-3xl mx-auto">
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
                  
                  <div>
                    <h3 className="text-base font-medium mb-4">Database & Storage Settings</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-muted-foreground mb-1 flex items-center">
                          <Database className="mr-2" size={16} />
                          MongoDB Connection URL
                        </label>
                        <Input 
                          value={settings.mongoDbUrl} 
                          onChange={(e) => setSettings({...settings, mongoDbUrl: e.target.value})}
                          placeholder="mongodb+srv://username:password@cluster.mongodb.net/database"
                        />
                        <p className="text-xs text-muted-foreground mt-1">
                          Enter your MongoDB Atlas connection string
                        </p>
                      </div>
                      
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <label className="block text-sm font-medium text-muted-foreground mb-1 flex items-center">
                            <ImageIcon className="mr-2" size={16} />
                            Cloudinary Cloud Name
                          </label>
                          <Input 
                            value={settings.cloudinaryCloudName} 
                            onChange={(e) => setSettings({...settings, cloudinaryCloudName: e.target.value})}
                            placeholder="your-cloud-name"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-muted-foreground mb-1">
                            Cloudinary API Key
                          </label>
                          <Input 
                            value={settings.cloudinaryApiKey} 
                            onChange={(e) => setSettings({...settings, cloudinaryApiKey: e.target.value})}
                            placeholder="123456789012345"
                          />
                        </div>
                        <div className="sm:col-span-2">
                          <label className="block text-sm font-medium text-muted-foreground mb-1">
                            Cloudinary API Secret
                          </label>
                          <Input 
                            type="password"
                            value={settings.cloudinaryApiSecret} 
                            onChange={(e) => setSettings({...settings, cloudinaryApiSecret: e.target.value})}
                            placeholder="Enter your Cloudinary API Secret"
                          />
                          <p className="text-xs text-muted-foreground mt-1">
                            Your credentials are securely stored and used for image uploads
                          </p>
                        </div>
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
              <Textarea 
                className="min-h-[100px]"
                value={newProduct.description} 
                onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                placeholder="Enter product description"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1">
                Product Images
              </label>
              <div className="mt-2 flex items-center gap-3">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center gap-2"
                  disabled={uploading}
                >
                  {uploading ? 'Uploading...' : (
                    <>
                      <Upload size={16} />
                      Upload Images
                    </>
                  )}
                </Button>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  className="hidden"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  disabled={uploading}
                />
                <p className="text-xs text-muted-foreground">
                  Images will be uploaded to Cloudinary
                </p>
              </div>
              
              {newProduct.images.length > 0 && (
                <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {newProduct.images.map((url, index) => (
                    <div key={index} className="relative group aspect-square">
                      <img 
                        src={url} 
                        alt={`Product preview ${index + 1}`} 
                        className="object-cover w-full h-full rounded-md"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(index)}
                        className="absolute top-2 right-2 bg-black/70 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        aria-label="Remove image"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          <SheetFooter className="sm:justify-between">
            <SheetClose asChild>
              <Button variant="outline">Cancel</Button>
            </SheetClose>
            <Button onClick={handleAddProduct} disabled={uploading}>
              Add Product
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
      
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
                <Textarea 
                  className="min-h-[100px]"
                  value={selectedProduct.description} 
                  onChange={(e) => setSelectedProduct({...selectedProduct, description: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-1">
                  Product Images
                </label>
                <div className="mt-2 flex items-center gap-3">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center gap-2"
                    disabled={uploading}
                  >
                    {uploading ? 'Uploading...' : (
                      <>
                        <Upload size={16} />
                        Upload Images
                      </>
                    )}
                  </Button>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    className="hidden"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    disabled={uploading}
                  />
                </div>
                
                <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {selectedProduct.images.map((url, index) => (
                    <div key={index} className="relative group aspect-square">
                      <img 
                        src={url} 
                        alt={`Product preview ${index + 1}`} 
                        className="object-cover w-full h-full rounded-md"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(index, true)}
                        className="absolute top-2 right-2 bg-black/70 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        aria-label="Remove image"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          <SheetFooter className="sm:justify-between">
            <SheetClose asChild>
              <Button variant="outline">Cancel</Button>
            </SheetClose>
            <Button onClick={handleSaveEditedProduct} disabled={uploading}>
              Save Changes
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
      
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
                <Textarea 
                  className="min-h-[100px]"
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
