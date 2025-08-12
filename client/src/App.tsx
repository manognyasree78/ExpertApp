import { Switch, Route, Router, useLocation } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "./lib/auth";
import { useEffect } from "react";
import Landing from "./pages/landing";
import Onboarding from "./pages/onboarding";
import PortalLayout from "./pages/portal/portal-layout";
import Dashboard from "./pages/portal/dashboard";
import Contribute from "./pages/portal/contribute";
import Status from "./pages/portal/status";
import Earnings from "./pages/portal/earnings";
import Support from "./pages/portal/support";
import Profile from "./pages/portal/profile";
import NotFound from "./pages/not-found";

function PortalRedirect() {
  const [, setLocation] = useLocation();
  useEffect(() => {
    // Navigate to the dashboard using a path relative to /portal
    setLocation('/dashboard');
  }, [setLocation]);
  return null;
}

function AppRouter() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Landing} />
        <Route path="/join" component={Onboarding} />
        <Route path="/portal" nest>
          <PortalLayout>
            <Switch>
              <Route path="/" component={PortalRedirect} />
              <Route path="/dashboard" component={Dashboard} />
              <Route path="/contribute" component={Contribute} />
              <Route path="/status" component={Status} />
              <Route path="/earnings" component={Earnings} />
              <Route path="/support" component={Support} />
              <Route path="/profile" component={Profile} />
              <Route component={NotFound} />
            </Switch>
          </PortalLayout>
        </Route>
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <AppRouter />
          <Toaster />
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
