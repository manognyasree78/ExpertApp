import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useAuth } from "@/lib/auth";
import { useLocation } from "wouter";
import { Bus, Bell, Settings, LogOut, ChevronDown } from "lucide-react";

export function PortalHeader() {
  const { auth, logout } = useAuth();
  const [, setLocation] = useLocation();

  const handleProfileSettings = () => {
    setLocation('/portal/profile');
  };

  const handleLogout = () => {
    logout();
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <header className="bg-card-dark border-b border-border-dark shadow-sm" data-testid="portal-header">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <span className="text-xl font-bold text-white">Expert Knowledge Portal</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="text-text-muted hover:text-white" data-testid="notifications-button">
              <Bell className="h-5 w-5" />
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-3" data-testid="user-menu-trigger">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary text-white text-sm">
                      {getInitials(auth.user.name)}
                    </AvatarFallback>
                  </Avatar>
                  <span className="font-medium text-white" data-testid="user-name">
                    Hi, {auth.user.name}
                  </span>
                  <ChevronDown className="h-4 w-4 text-text-muted" />
                </Button>
              </DropdownMenuTrigger>
              
              <DropdownMenuContent align="end" className="w-48" data-testid="user-menu">
                <DropdownMenuItem onClick={handleProfileSettings} data-testid="menu-profile-settings">
                  <Settings className="mr-2 h-4 w-4" />
                  Profile Settings
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout} data-testid="menu-logout">
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}
