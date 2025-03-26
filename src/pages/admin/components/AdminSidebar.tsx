
import { BarChart, ShoppingBag, Star, MessageSquare, Settings, LogOut } from "lucide-react";

interface AdminSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onLogout: () => void;
}

const AdminSidebar = ({ activeTab, setActiveTab, onLogout }: AdminSidebarProps) => {
  const sidebarItems = [
    { id: "overview", label: "Dashboard", icon: BarChart },
    { id: "products", label: "Products", icon: ShoppingBag },
    { id: "reviews", label: "Reviews & Ratings", icon: Star },
    { id: "queries", label: "User Queries", icon: MessageSquare },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
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
            onClick={onLogout}
            className="w-full flex items-center p-3 rounded-md text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
          >
            <LogOut size={18} className="mr-2" />
            <span>Logout</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default AdminSidebar;
