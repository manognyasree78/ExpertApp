import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useAuth } from "@/lib/auth";
import { loginSchema, signupSchema, type LoginData, type SignupData } from "@/lib/validation";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";
import { LogIn, UserPlus } from "lucide-react";

interface AuthModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultTab?: "login" | "signup";
}

export function AuthModal({ open, onOpenChange, defaultTab = "signup" }: AuthModalProps) {
  const [activeTab, setActiveTab] = useState(defaultTab);
  const { login } = useAuth();
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  const loginForm = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const signupForm = useForm<SignupData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onLogin = (data: LoginData) => {
    const name = data.email.split('@')[0]; // Derive name from email prefix
    login({ name, email: data.email });
    onOpenChange(false);
    setLocation('/join');
    toast({
      title: "Login successful",
      description: "Welcome back to expertApp!",
    });
  };

  const onSignup = (data: SignupData) => {
    login({ name: data.fullName, email: data.email });
    onOpenChange(false);
    setLocation('/join');
    toast({
      title: "Account created",
      description: "Welcome to expertApp! Please complete your profile.",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-bg-dark border-border-dark text-white" data-testid="auth-modal">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-white">
            {activeTab === "login" ? "Welcome Back" : "Join expertApp"}
          </DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "login" | "signup")}>
          <TabsList className="grid w-full grid-cols-2 bg-bg-light border-border-dark">
            <TabsTrigger value="login" className="data-[state=active]:bg-primary data-[state=active]:text-white" data-testid="tab-login">Login</TabsTrigger>
            <TabsTrigger value="signup" className="data-[state=active]:bg-primary data-[state=active]:text-white" data-testid="tab-signup">Sign Up</TabsTrigger>
          </TabsList>

          <TabsContent value="login" className="space-y-4">
            <Form {...loginForm}>
              <form onSubmit={loginForm.handleSubmit(onLogin)} className="space-y-4" data-testid="form-login">
                <FormField
                  control={loginForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-text-muted">Email</FormLabel>
                      <FormControl>
                        <Input placeholder="your@email.com" className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-400 focus:border-primary focus:ring-primary" {...field} data-testid="input-email" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={loginForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-text-muted">Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="Password (min 6 characters)" className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-400 focus:border-primary focus:ring-primary" {...field} data-testid="input-password" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full bg-primary hover:bg-primary-hover text-white" data-testid="button-login">
                  <LogIn className="mr-2 h-4 w-4" />
                  Login
                </Button>
              </form>
            </Form>
          </TabsContent>

          <TabsContent value="signup" className="space-y-4">
            <Form {...signupForm}>
              <form onSubmit={signupForm.handleSubmit(onSignup)} className="space-y-4" data-testid="form-signup">
                <FormField
                  control={signupForm.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-text-muted">Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your full name" className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-400 focus:border-primary focus:ring-primary" {...field} data-testid="input-fullname" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={signupForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-text-muted">Email</FormLabel>
                      <FormControl>
                        <Input placeholder="your@email.com" className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-400 focus:border-primary focus:ring-primary" {...field} data-testid="input-email-signup" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={signupForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-text-muted">Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="Password (min 6 characters)" className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-400 focus:border-primary focus:ring-primary" {...field} data-testid="input-password-signup" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={signupForm.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-text-muted">Confirm Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="Confirm password" className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-400 focus:border-primary focus:ring-primary" {...field} data-testid="input-confirm-password" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full bg-primary hover:bg-primary-hover text-white" data-testid="button-signup">
                  <UserPlus className="mr-2 h-4 w-4" />
                  Sign Up
                </Button>
              </form>
            </Form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
