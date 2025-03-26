
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Layout, LayoutContent } from "@/components/layout/Layout";
import { toast } from "sonner";
import { useDatabase } from "@/context/DatabaseContext";
import AdminSidebar from "./components/AdminSidebar";
import AdminHeader from "./components/AdminHeader";
import DashboardOverview from "./components/DashboardOverview";
import ProductsManagement from "./components/ProductsManagement";
import ReviewsManagement from "./components/ReviewsManagement";
import QueriesManagement from "./components/QueriesManagement";
import SettingsPanel from "./components/SettingsPanel";
import MobileMenu from "./components/MobileMenu";

const AdminDashboard = () => {
  const { loading, error, refreshData } = useDatabase();
  const [activeTab, setActiveTab] = useState("overview");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

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
          <button 
            className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90"
            onClick={() => refreshData()}
          >
            Retry Connection
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary/20">
      <div className="flex min-h-screen flex-col md:flex-row">
        <MobileMenu 
          isMobileMenuOpen={isMobileMenuOpen} 
          setIsMobileMenuOpen={setIsMobileMenuOpen} 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          onLogout={handleLogout}
        />
        
        <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} onLogout={handleLogout} />
        
        <div className="flex-1 overflow-auto">
          <AdminHeader 
            activeTab={activeTab} 
            onLogout={handleLogout} 
            setIsMobileMenuOpen={setIsMobileMenuOpen} 
            isMobileMenuOpen={isMobileMenuOpen} 
          />
          
          <main className="p-4 md:p-6">
            {activeTab === "overview" && <DashboardOverview />}
            {activeTab === "products" && <ProductsManagement />}
            {activeTab === "reviews" && <ReviewsManagement />}
            {activeTab === "queries" && <QueriesManagement />}
            {activeTab === "settings" && <SettingsPanel />}
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
