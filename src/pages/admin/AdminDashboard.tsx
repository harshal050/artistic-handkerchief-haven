
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
  LogOut
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

// Mock data for initial dashboard
const mockStats = {
  totalProducts: 24,
  totalReviews: 48,
  averageRating: 4.7,
  pendingQueries: 3
};

const AdminDashboard = () => {
  const [stats, setStats] = useState(mockStats);
  const [activeTab, setActiveTab] = useState("overview");
  const navigate = useNavigate();

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
                      <span className="text-2xl font-bold">{stats.totalProducts}</span>
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
                      <span className="text-2xl font-bold">{stats.totalReviews}</span>
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
                      <span className="text-2xl font-bold">{stats.averageRating}</span>
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
                      <span className="text-2xl font-bold">{stats.pendingQueries}</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
            
            {activeTab === "products" && (
              <div className="bg-card p-6 rounded-lg">
                <h2 className="text-xl font-semibold mb-4">Products Management</h2>
                <p className="text-muted-foreground">
                  Product management interface will be implemented here.
                </p>
              </div>
            )}
            
            {activeTab === "reviews" && (
              <div className="bg-card p-6 rounded-lg">
                <h2 className="text-xl font-semibold mb-4">Reviews & Ratings</h2>
                <p className="text-muted-foreground">
                  Reviews and ratings management interface will be implemented here.
                </p>
              </div>
            )}
            
            {activeTab === "queries" && (
              <div className="bg-card p-6 rounded-lg">
                <h2 className="text-xl font-semibold mb-4">User Queries</h2>
                <p className="text-muted-foreground">
                  User queries management interface will be implemented here.
                </p>
              </div>
            )}
            
            {activeTab === "settings" && (
              <div className="bg-card p-6 rounded-lg">
                <h2 className="text-xl font-semibold mb-4">Settings</h2>
                <p className="text-muted-foreground">
                  Admin settings interface will be implemented here.
                </p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
