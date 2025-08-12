import { cn } from "@/lib/utils";
import { useLocation } from "wouter";
import { 
  BarChart3, 
  PlusCircle, 
  CheckSquare, 
  TrendingUp, 
  LifeBuoy
} from "lucide-react";

// Use routes relative to the portal base so navigation works with nested routing
const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: BarChart3 },
  { name: 'Contribute Knowledge', href: '/contribute', icon: PlusCircle },
  { name: 'My Knowledge Status', href: '/status', icon: CheckSquare },
  { name: 'Earnings', href: '/earnings', icon: TrendingUp },
  { name: 'Support', href: '/support', icon: LifeBuoy },
];

export function PortalSidebar() {
  const [location, setLocation] = useLocation();

  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-screen" data-testid="portal-sidebar">
      <nav className="p-4 space-y-2">
        {navigation.map((item) => {
          const Icon = item.icon;
          const isActive = location === item.href;
          
          return (
            <button
              key={item.name}
              onClick={() => setLocation(item.href)}
              className={cn(
                "w-full flex items-center px-4 py-3 text-left rounded-xl transition-smooth",
                isActive 
                  ? "bg-primary text-white" 
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              )}
              data-testid={`nav-${item.name.toLowerCase().replace(/\s+/g, '-')}`}
            >
              <Icon className="mr-3 h-5 w-5" />
              {item.name}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
