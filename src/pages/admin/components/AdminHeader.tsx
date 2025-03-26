
import { LogOut, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AdminHeaderProps {
  activeTab: string;
  onLogout: () => void;
  setIsMobileMenuOpen: (isOpen: boolean) => void;
  isMobileMenuOpen: boolean;
}

const AdminHeader = ({ activeTab, onLogout, setIsMobileMenuOpen, isMobileMenuOpen }: AdminHeaderProps) => {
  const getTabTitle = (tab: string) => {
    switch (tab) {
      case "overview": return "Dashboard";
      case "products": return "Products";
      case "reviews": return "Reviews & Ratings";
      case "queries": return "User Queries";
      case "settings": return "Settings";
      default: return "Dashboard";
    }
  };

  return (
    <>
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
      
      <header className="bg-card border-b border-border p-4 flex justify-between items-center hidden md:flex">
        <h1 className="text-xl font-semibold">
          {getTabTitle(activeTab)}
        </h1>
        <div className="flex items-center gap-2">
          <Button
            variant="destructive"
            size="sm"
            onClick={onLogout}
          >
            <LogOut size={16} className="mr-2" />
            Logout
          </Button>
        </div>
      </header>
    </>
  );
};

export default AdminHeader;
