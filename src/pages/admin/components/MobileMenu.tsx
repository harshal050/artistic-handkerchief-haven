
import { BarChart, ShoppingBag, Star, MessageSquare, Settings, LogOut, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetClose } from "@/components/ui/sheet";

interface MobileMenuProps {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (isOpen: boolean) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onLogout: () => void;
}

const MobileMenu = ({ 
  isMobileMenuOpen, 
  setIsMobileMenuOpen, 
  activeTab, 
  setActiveTab, 
  onLogout 
}: MobileMenuProps) => {
  const sidebarItems = [
    { id: "overview", label: "Dashboard", icon: BarChart },
    { id: "products", label: "Products", icon: ShoppingBag },
    { id: "reviews", label: "Reviews & Ratings", icon: Star },
    { id: "queries", label: "User Queries", icon: MessageSquare },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
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
              onClick={onLogout}
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
  );
};

export default MobileMenu;
