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
import { useDatabase } from "@/context/DatabaseContext";
import { 
  createProduct, 
  updateProduct, 
  deleteProduct, 
  uploadProductImage 
} from '@/services/product.service';
import { 
  createCategory, 
  deleteCategory 
} from '@/services/category.service';
import { 
  updateReview, 
  deleteReview 
} from '@/services/review.service';
import { 
  updateQueryStatus 
} from '@/services/query.service';
import { 
  updateSettings 
} from '@/services/settings.service';
import { 
  uploadImages 
} from '@/services/upload.service';

// COLORS for the charts
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const AdminDashboard = () => {
  const { 
    products, 
    categories, 
    reviews, 
    queries, 
    settings,
    loading, 
    error, 
    refreshData 
  } = useDatabase();

  const [stats, setStats] = useState({
    totalProducts: 0,
    totalReviews: 0,
    averageRating: 0,
    pendingQueries: 0,
    totalVisits: 1246, // Mockup for now
    totalUsers: 87 // Mockup for now
  });

  const [activeTab, setActiveTab] = useState("overview");
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false);
  const [isEditProductOpen, setIsEditProductOpen] = useState(false);
  const [isEditReviewOpen, setIsEditReviewOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [selectedReview, setSelectedReview] = useState<any>(null);
  const [newCategory, setNewCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [localSettings, setLocalSettings] = useState<any>(settings || {});
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // New product form state
  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "",
    price: "",
    discountPrice: "",
    description: "",
    images: [] as string[]
  });

  // New file upload state
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);

  // Update stats when data changes
  useEffect(() => {
    if (products && reviews && queries) {
      const reviewRatings = reviews.reduce((total, review) => total + review.rating, 0);
      setStats({
        totalProducts: products.length,
        totalReviews: reviews.length,
        averageRating: reviews.length > 0 ? reviewRatings / reviews.length : 0,
        pendingQueries: queries.filter(q => q.status === "pending").length,
        totalVisits: 1246, // Mockup for now
        totalUsers: 87 // Mockup for now
      });
    }
  }, [products, reviews, queries]);

  // Update local settings when database settings change
  useEffect(() => {
    if (settings) {
      setLocalSettings(settings);
    }
  }, [settings]);

  useEffect(() => {
    // Check if admin is logged in
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

  const handleAddCategory = async () => {
    if (newCategory.trim() === "") {
      toast.error("Please enter a category name");
      return;
    }
    
    if (categories.some(c => c.name === newCategory)) {
      toast.error("This category already exists");
      return;
    }
    
    try {
      await createCategory(newCategory);
      await refreshData();
      setNewCategory("");
      setIsAddCategoryOpen(false);
      toast.success("Category added successfully");
    } catch (error) {
      console.error('Error adding category:', error);
      toast.error("Failed to add category");
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length === 0) return;
    
    const files = Array.from(event.target.files);
    setUploading(true);
    
    try {
      // Convert files to base64 for Cloudinary upload
      const base64Files = await Promise.all(
        files.map(file => {
          return new Promise<string>((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => {
              resolve(reader.result as string);
            };
            reader.readAsDataURL(file);
          });
        })
      );
      
      // Upload to Cloudinary
      const uploadedUrls = await uploadImages(base64Files);
      
      if (isEditProductOpen && selectedProduct) {
        // For editing existing product
        setSelectedProduct({
          ...selectedProduct,
          images: [...selectedProduct.images, ...uploadedUrls]
        });
      } else {
        // For adding new product
        setNewProduct({
          ...newProduct,
          images: [...newProduct.images, ...uploadedUrls]
        });
      }
      
      setSelectedFiles([...selectedFiles, ...files]);
      toast.success(`${files.length} image(s) uploaded successfully`);
    } catch (error) {
      console.error('Error uploading files:', error);
      toast.error("Failed to upload images");
    } finally {
      setUploading(false);
    }
  };

  const handleAddProduct = async () => {
    // Validation
    if (!newProduct.name || !newProduct.category || !newProduct.price || !newProduct.description) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      const productToAdd = {
        name: newProduct.name,
        category: newProduct.category,
        price: parseFloat(newProduct.price),
        ...(newProduct.discountPrice && { discount: calculateDiscount(parseFloat(newProduct.price), parseFloat(newProduct.discountPrice)) }),
        description: newProduct.description,
        images: newProduct.images.length > 0 ? newProduct.images : ["/placeholder.svg"]
      };

      await createProduct(productToAdd);
      await refreshData();
      
      // Reset form
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
    } catch (error) {
      console.error('Error adding product:', error);
      toast.error("Failed to add product");
    }
  };

  const calculateDiscount = (originalPrice: number, discountedPrice: number) => {
    if (originalPrice <= 0 || discountedPrice >= originalPrice) return 0;
    return Math.round(((originalPrice - discountedPrice) / originalPrice) * 100);
  };

  const handleDeleteProduct = async (id: string) => {
    try {
      await deleteProduct(id);
      await refreshData();
      toast.success("Product deleted successfully");
    } catch (error) {
      console.error(`Error deleting product with id ${id}:`, error);
      toast.error("Failed to delete product");
    }
  };

  const handleEditProduct = (product: any) => {
    setSelectedProduct(product);
    setIsEditProductOpen(true);
  };

  const handleSaveEditedProduct = async () => {
    try {
      if (!selectedProduct || !selectedProduct._id) {
        toast.error("Product not found");
        return;
      }

      // Calculate discount if discountPrice is provided
      let productData = { ...selectedProduct };
      if (typeof selectedProduct.discountPrice === 'number' && selectedProduct.discountPrice < selectedProduct.price) {
        productData.discount = calculateDiscount(selectedProduct.price, selectedProduct.discountPrice);
        delete productData.discountPrice; // Remove discountPrice as it's not in our schema
      }

      await updateProduct(selectedProduct._id, productData);
      await refreshData();
      setIsEditProductOpen(false);
      toast.success("Product updated successfully");
    } catch (error) {
      console.error('Error updating product:', error);
      toast.error("Failed to update product");
    }
  };

  const handleDeleteReview = async (id: string) => {
    try {
      await deleteReview(id);
      await refreshData();
      toast.success("Review deleted successfully");
    } catch (error) {
      console.error(`Error deleting review with id ${id}:`, error);
      toast.error("Failed to delete review");
    }
  };

  const handleEditReview = (review: any) => {
    setSelectedReview(review);
    setIsEditReviewOpen(true);
  };

  const handleSaveEditedReview = async () => {
    try {
      if (!selectedReview || !selectedReview._id) {
        toast.error("Review not found");
        return;
      }

      await updateReview(selectedReview._id, selectedReview);
      await refreshData();
      setIsEditReviewOpen(false);
      toast.success("Review updated successfully");
    } catch (error) {
      console.error('Error updating review:', error);
      toast.error("Failed to update review");
    }
  };

  const handleUpdateQueryStatus = async (id: string, newStatus: 'pending' | 'done') => {
    try {
      await updateQueryStatus(id, newStatus);
      await refreshData();
      toast.success(`Query marked as ${newStatus}`);
    } catch (error) {
      console.error(`Error updating query status with id ${id}:`, error);
      toast.error("Failed to update query status");
    }
  };

  const handleSaveSettings = async () => {
    try {
      await updateSettings(localSettings);
      await refreshData();
      toast.success("Settings updated successfully");
    } catch (error) {
      console.error('Error updating settings:', error);
      toast.error("Failed to update settings");
    }
  };

  const handleRemoveImage = (indexToRemove: number, isEditing = false) => {
    if (isEditing && selectedProduct) {
      const updatedImages = selectedProduct.images.filter((_: any, index: number) => index !== indexToRemove);
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

  const filteredProducts = products
    ? products.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  // Generate rating data for chart
  const ratingData = [
    { name: '5 Stars', value: reviews?.filter(r => r.rating === 5).length || 0 },
    { name: '4 Stars', value: reviews?.filter(r => r.rating === 4).length || 0 },
    { name: '3 Stars', value: reviews?.filter(r => r.rating === 3).length || 0 },
    { name: '2 Stars', value: reviews?.filter(r => r.rating === 2).length || 0 },
    { name: '1 Star', value: reviews?.filter(r => r.rating === 1).length || 0 },
  ];

  // Mock visit data (would be real in production)
  const visitData = [
    { name: 'Mon', visits: 120 },
    { name: 'Tue', visits: 145 },
    { name: 'Wed', visits: 132 },
    { name: 'Thu', visits: 167 },
    { name: 'Fri', visits: 189 },
    { name: 'Sat', visits: 212 },
    { name: 'Sun', visits: 198 },
  ];

  // Generate product view data
  const categoryGroups = products?.reduce((acc: any, product) => {
    const category = product.category;
    if (!acc[category]) {
      acc[category] = 0;
    }
    acc[category] += 1;
    return acc;
  }, {});

  const productViewData = Object.entries(categoryGroups || {}).map(([name, count]) => ({
    name,
    views: count,
  }));

  const sidebarItems = [
    { id: "overview", label: "Dashboard", icon: BarChart },
    { id: "products", label: "Products", icon: ShoppingBag },
    { id: "reviews", label: "Reviews & Ratings", icon: Star },
    { id: "queries", label: "User Queries", icon: MessageSquare },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-secondary/20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-lg">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-secondary/20 flex items-center justify-center">
        <div className="text-center max-w-md p-6 bg-card rounded-lg shadow-lg">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-xl font-bold mb-2">Connection Error</h2>
          <p className="mb-4">Failed to connect to the database. Please check your MongoDB connection settings.</p>
          <Button onClick={() => refreshData()}>Retry Connection</Button>
        </div>
      </div>
    );
  }

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
                        <span className="text-xl md:text-2xl font-bold">{stats.totalProducts}</span>
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
                        <span className="text-xl md:text-2xl font-bold">{stats.totalReviews}</span>
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
                          {stats.totalReviews > 0 ? stats.averageRating.toFixed(1) : "N/A"}
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
                          {stats.pendingQueries}
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
                            data={ratingData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            nameKey="name"
                            label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          >
                            {ratingData.map((entry, index) => (
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
                          data={visitData}
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
                          data={productViewData}
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
                            <TableRow key={product._id?.toString()}>
                              <TableCell className="font-medium">{product.name}</TableCell>
                              <TableCell className="hidden md:table-cell">{product.category}</TableCell>
                              <TableCell>₹{product.price}</TableCell>
                              <TableCell className="hidden md:table-cell">
                                {product.discount 
                                  ? `${product.discount}% off` 
                                  : "-"}
                              </TableCell>
                              <TableCell className="text-right">
                                <div className="flex justify-end gap-2">
                                  <Button variant="outline" size="sm" onClick={() => handleEditProduct(product)}>
                                    <Edit size={14} />
                                  </Button>
                                  <Button variant="destructive" size="sm" onClick={() => handleDeleteProduct(product._id?.toString() || "")}>
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
                      <div key={category._id?.toString()} className="bg-secondary text-secondary-foreground px-4 py-2 rounded-full text-sm">
                        {category.name}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === "reviews" && (
              <div className="bg-card p-4 md:p-6 rounded-lg">
                <h2 className="text-xl font-semibold mb-6">Reviews & Ratings</h2>
                
                {reviews?.length > 0 ? (
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
                          <TableRow key={review._id?.toString()}>
                            <TableCell className="font-medium">
                              {products?.find(p => p._id?.toString() === review.productId?.toString())?.name || "Unknown Product"}
                            </TableCell>
                            <TableCell>{review.userName}</TableCell>
                            <TableCell>
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <Star
