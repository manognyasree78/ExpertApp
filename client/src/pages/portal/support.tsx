import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { 
  Send, 
  HelpCircle, 
  DollarSign, 
  Star, 
  Smartphone, 
  Mail, 
  Phone, 
  Clock,
  ExternalLink
} from "lucide-react";

const supportSchema = z.object({
  category: z.string().min(1, "Please select a category"),
  subject: z.string().min(1, "Subject is required"),
  description: z.string().min(10, "Please provide more details (at least 10 characters)")
});

type SupportFormData = z.infer<typeof supportSchema>;

interface SupportTicket {
  id: string;
  subject: string;
  category: string;
  status: "Open" | "In Progress" | "Resolved" | "Closed";
  createdDate: string;
  ticketNumber: string;
}

const supportCategories = [
  "Technical Issue",
  "Payment/Billing", 
  "Account Settings",
  "Content Guidelines",
  "General Question"
];

const mockTickets: SupportTicket[] = [
  {
    id: "1",
    subject: "Payment processing delay",
    category: "Payment/Billing",
    status: "In Progress", 
    createdDate: "2024-01-08",
    ticketNumber: "SP-2024-001"
  },
  {
    id: "2", 
    subject: "Knowledge article formatting",
    category: "Content Guidelines",
    status: "Resolved",
    createdDate: "2024-01-05", 
    ticketNumber: "SP-2024-002"
  }
];

const quickHelpItems = [
  {
    icon: HelpCircle,
    title: "How to submit knowledge articles",
    description: "Step-by-step guide for contributing content",
    color: "text-primary"
  },
  {
    icon: DollarSign,
    title: "Understanding payment schedules", 
    description: "Learn about earnings and payout timing",
    color: "text-green-600"
  },
  {
    icon: Star,
    title: "Improving your expert rating",
    description: "Tips to enhance your profile performance", 
    color: "text-yellow-500"
  },
  {
    icon: Smartphone,
    title: "WhatsApp integration guide",
    description: "Setup instructions for consultation alerts",
    color: "text-accent"
  }
];

export default function Support() {
  const { toast } = useToast();
  
  const form = useForm<SupportFormData>({
    resolver: zodResolver(supportSchema),
    defaultValues: {
      category: "",
      subject: "",
      description: ""
    }
  });

  const onSubmit = (data: SupportFormData) => {
    toast({
      title: "Support ticket submitted!",
      description: "We'll get back to you within 24 hours on business days.",
    });
    form.reset();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Open":
        return "bg-blue-100 text-blue-800";
      case "In Progress": 
        return "bg-yellow-100 text-yellow-800";
      case "Resolved":
        return "bg-green-100 text-green-800";
      case "Closed":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short', 
      day: 'numeric'
    });
  };

  return (
    <div data-testid="support-page">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2" data-testid="support-title">
          Support
        </h1>
        <p className="text-gray-600">
          Get help with the platform, technical issues, or general questions.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Submit Support Ticket */}
          <Card>
            <CardHeader>
              <CardTitle>Submit a Support Ticket</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" data-testid="support-form">
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger data-testid="select-category">
                              <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {supportCategories.map((category) => (
                              <SelectItem key={category} value={category}>
                                {category}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subject</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Brief description of your issue" 
                            {...field} 
                            data-testid="input-subject"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea 
                            rows={6}
                            placeholder="Please provide detailed information about your issue or question..." 
                            {...field} 
                            data-testid="textarea-description"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" data-testid="button-submit-ticket">
                    <Send className="mr-2 h-4 w-4" />
                    Submit Ticket
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>

          {/* My Support Tickets */}
          <Card>
            <CardHeader>
              <CardTitle>My Support Tickets</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3" data-testid="support-tickets">
                {mockTickets.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No support tickets found</p>
                    <p className="text-sm text-gray-400">Submit your first ticket above</p>
                  </div>
                ) : (
                  mockTickets.map((ticket) => (
                    <div 
                      key={ticket.id} 
                      className="p-4 border border-gray-200 rounded-lg"
                      data-testid={`ticket-${ticket.id}`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium text-gray-900" data-testid={`ticket-subject-${ticket.id}`}>
                          {ticket.subject}
                        </h4>
                        <Badge 
                          className={`${getStatusColor(ticket.status)} font-medium`}
                          data-testid={`ticket-status-${ticket.id}`}
                        >
                          {ticket.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">
                        {ticket.category} • Ticket #{ticket.ticketNumber}
                      </p>
                      <p className="text-sm text-gray-500">
                        Created {formatDate(ticket.createdDate)}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          {/* Quick Help */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Help</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {quickHelpItems.map((item, index) => {
                  const IconComponent = item.icon;
                  return (
                    <button
                      key={index}
                      className="w-full text-left p-3 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-smooth flex items-start"
                      data-testid={`help-item-${index}`}
                    >
                      <IconComponent className={`mr-3 h-4 w-4 mt-0.5 flex-shrink-0 ${item.color}`} />
                      <div>
                        <p className="font-medium">{item.title}</p>
                        <p className="text-gray-600 text-xs mt-1">{item.description}</p>
                      </div>
                      <ExternalLink className="ml-auto h-3 w-3 text-gray-400" />
                    </button>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-sm">
                <div className="flex items-center">
                  <Mail className="text-primary mr-3 h-4 w-4" />
                  <div>
                    <p className="font-medium">Email Support</p>
                    <p className="text-gray-600" data-testid="contact-email">support@ottobon.in</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Phone className="text-primary mr-3 h-4 w-4" />
                  <div>
                    <p className="font-medium">Phone Support</p>
                    <p className="text-gray-600">+91 (555) 123-4567</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Clock className="text-primary mr-3 h-4 w-4 mt-0.5" />
                  <div>
                    <p className="font-medium">Support Hours</p>
                    <p className="text-gray-600">Mon-Fri: 9:00 AM - 6:00 PM IST</p>
                    <p className="text-gray-600">Sat: 10:00 AM - 2:00 PM IST</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-600">
                  We'll reply within <strong>24 hours</strong> on business days.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* FAQ Links */}
          <Card>
            <CardHeader>
              <CardTitle>Popular Resources</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <button className="w-full text-left text-gray-700 hover:text-primary transition-smooth">
                  • Getting Started Guide
                </button>
                <button className="w-full text-left text-gray-700 hover:text-primary transition-smooth">
                  • Content Quality Guidelines
                </button>
                <button className="w-full text-left text-gray-700 hover:text-primary transition-smooth">
                  • Payment & Earnings FAQ
                </button>
                <button className="w-full text-left text-gray-700 hover:text-primary transition-smooth">
                  • Platform Terms of Service
                </button>
                <button className="w-full text-left text-gray-700 hover:text-primary transition-smooth">
                  • Privacy Policy
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
