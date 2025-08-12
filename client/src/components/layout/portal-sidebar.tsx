import { cn } from "@/lib/utils";
import { useLocation } from "wouter";
import { 
  BarChart3, 
  PlusCircle, 
  CheckSquare, 
  TrendingUp, 
  LifeBuoy
} from "lucide-react";

const navigation = [
  { name: 'Dashboard', href: '/portal/dashboard', icon: BarChart3 },
  { name: 'Contribute Knowledge', href: '/portal/contribute', icon: PlusCircle },
  { name: 'My Knowledge Status', href: '/portal/status', icon: CheckSquare },
  { name: 'Earnings', href: '/portal/earnings', icon: TrendingUp },
  { name: 'Support', href: '/portal/support', icon: LifeBuoy },
];

export function PortalSidebar() {
  const [location, setLocation] = useLocation();

  return (
    <aside className="w-64 bg-card-dark border-r border-border-dark min-h-screen" data-testid="portal-sidebar">
      <nav className="p-4 space-y-2">
        {navigation.map((item) => {
          const Icon = item.icon;
          const isActive = location === item.href;
          
          return (
            <button
              key={item.name}
              onClick={() => setLocation(item.href)}
              className={cn(
                "w-full flex items-center px-4 py-3 text-left rounded-lg transition-smooth",
                isActive 
                  ? "bg-primary text-white" 
                  : "text-text-muted hover:bg-gray-800 hover:text-white"
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
