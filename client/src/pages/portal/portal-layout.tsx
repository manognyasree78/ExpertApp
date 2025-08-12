import { useEffect, ReactNode } from "react";
import { useAuth } from "@/lib/auth";
import { useLocation } from "wouter";
import { PortalHeader } from "@/components/layout/portal-header";
import { PortalSidebar } from "@/components/layout/portal-sidebar";

interface PortalLayoutProps {
  children: ReactNode;
}

export default function PortalLayout({ children }: PortalLayoutProps) {
  const { approval } = useAuth();
  const [, setLocation] = useLocation();

  // Redirect if not approved
  useEffect(() => {
    if (!approval.approved) {
      setLocation('/join');
    }
  }, [approval.approved, setLocation]);

  if (!approval.approved) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50" data-testid="portal-layout">
      <PortalHeader />
      <div className="flex">
        <PortalSidebar />
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
