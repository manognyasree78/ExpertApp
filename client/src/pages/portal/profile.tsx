import { useState } from "react";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useAuth } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";
import { 
  Upload, 
  Shield, 
  Download, 
  CheckCircle, 
  Clock, 
  Star,
  Users,
  BookOpen
} from "lucide-react";

interface ProfileFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  timezone: string;
  company: string;
  bio: string;
  linkedin: string;
  website: string;
}

interface NotificationSettings {
  emailUpdates: boolean;
  whatsappEscalations: boolean;
  monthlySummary: boolean;
  platformAnnouncements: boolean;
}

const timezones = [
  { value: "PST", label: "PST - Pacific Standard Time" },
  { value: "EST", label: "EST - Eastern Standard Time" },
  { value: "GMT", label: "GMT - Greenwich Mean Time" },
  { value: "IST", label: "IST - India Standard Time" },
];

const expertDomains = [
  { name: "Digital Marketing", verified: true },
  { name: "SEO Strategy", verified: true },
  { name: "Business Analytics", verified: false },
  { name: "Financial Planning", verified: false }
];

const verificationStatuses = [
  { domain: "Finance", status: "Verified", badge: "success" },
  { domain: "Data Science", status: "Verified", badge: "success" },
  { domain: "Marketing", status: "Pending", badge: "warning" },
  { domain: "Cloud Computing", status: "Pending", badge: "warning" }
];

export default function Profile() {
  const [activeTab, setActiveTab] = useState("personal");
  const [availabilityStatus, setAvailabilityStatus] = useState("available");
  const [paymentMethod, setPaymentMethod] = useState("bank");
  const { auth } = useAuth();
  const { toast } = useToast();

  const profileForm = useForm<ProfileFormData>({
    defaultValues: {
      firstName: auth.user.name.split(' ')[0] || "",
      lastName: auth.user.name.split(' ')[1] || "",
      email: auth.user.email || "",
      phone: "+1 (555) 987-6543",
      timezone: "PST",
      company: "Tech Solutions Inc.",
      bio: "Dr. Sarah Johnson is a seasoned financial analyst with over 15 years of experience in investment banking and corporate finance. She specializes in venture capital, mergers & acquisitions, and financial modeling.",
      linkedin: "https://linkedin.com/in/sarahjohnson",
      website: "https://sarahjohnson.expert"
    }
  });

  const [notifications, setNotifications] = useState<NotificationSettings>({
    emailUpdates: true,
    whatsappEscalations: true,
    monthlySummary: true,
    platformAnnouncements: true
  });

  const onSubmitProfile = (data: ProfileFormData) => {
    toast({
      title: "Profile updated successfully!",
      description: "Your changes have been saved.",
    });
  };

  const handleNotificationChange = (key: keyof NotificationSettings, value: boolean) => {
    setNotifications(prev => ({ ...prev, [key]: value }));
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const handleSecurityAction = (action: string) => {
    toast({
      title: `${action} completed`,
      description: "Security settings updated successfully.",
    });
  };

  const handlePaymentUpdate = () => {
    toast({
      title: "Payment method updated",
      description: "Your payment preferences have been saved.",
    });
  };

  return (
    <div data-testid="profile-page">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2" data-testid="profile-title">
          Profile Settings
        </h1>
        <p className="text-gray-600">
          Manage your expert profile and account preferences.
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="personal" data-testid="tab-personal">Personal</TabsTrigger>
          <TabsTrigger value="expertise" data-testid="tab-expertise">Expertise</TabsTrigger>
          <TabsTrigger value="notifications" data-testid="tab-notifications">Notifications</TabsTrigger>
          <TabsTrigger value="payments" data-testid="tab-payments">Payments</TabsTrigger>
          <TabsTrigger value="security" data-testid="tab-security">Security</TabsTrigger>
        </TabsList>

        <div className="mt-8">
          {/* Personal Information */}
          <TabsContent value="personal">
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Form {...profileForm}>
                      <form onSubmit={profileForm.handleSubmit(onSubmitProfile)} className="space-y-4" data-testid="personal-form">
                        <div className="grid md:grid-cols-2 gap-4">
                          <FormField
                            control={profileForm.control}
                            name="firstName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>First Name</FormLabel>
                                <FormControl>
                                  <Input {...field} data-testid="input-firstname" />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={profileForm.control}
                            name="lastName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Last Name</FormLabel>
                                <FormControl>
                                  <Input {...field} data-testid="input-lastname" />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={profileForm.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                  <Input type="email" {...field} data-testid="input-email" />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={profileForm.control}
                            name="phone"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Phone</FormLabel>
                                <FormControl>
                                  <Input {...field} data-testid="input-phone" />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={profileForm.control}
                            name="timezone"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Time Zone</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger data-testid="select-timezone">
                                      <SelectValue />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {timezones.map((tz) => (
                                      <SelectItem key={tz.value} value={tz.value}>
                                        {tz.label}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={profileForm.control}
                            name="company"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Company</FormLabel>
                                <FormControl>
                                  <Input {...field} data-testid="input-company" />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </div>

                        <FormField
                          control={profileForm.control}
                          name="bio"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Professional Bio</FormLabel>
                              <FormControl>
                                <Textarea 
                                  rows={4} 
                                  {...field} 
                                  data-testid="textarea-bio"
                                />
                              </FormControl>
                              <p className="text-sm text-gray-500">{field.value.length}/250 characters</p>
                            </FormItem>
                          )}
                        />

                        <div className="grid md:grid-cols-2 gap-4">
                          <FormField
                            control={profileForm.control}
                            name="linkedin"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>LinkedIn URL</FormLabel>
                                <FormControl>
                                  <Input {...field} data-testid="input-linkedin" />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={profileForm.control}
                            name="website"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Personal Website</FormLabel>
                                <FormControl>
                                  <Input {...field} data-testid="input-website" />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </div>

                        <Button type="submit" data-testid="button-save-profile">
                          Save Changes
                        </Button>
                      </form>
                    </Form>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                {/* Profile Picture */}
                <Card>
                  <CardHeader>
                    <CardTitle>Profile Picture</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <Avatar className="w-24 h-24 mx-auto mb-4">
                      <AvatarFallback className="bg-primary text-white text-2xl">
                        {getInitials(auth.user.name)}
                      </AvatarFallback>
                    </Avatar>
                    <Button variant="outline" data-testid="button-change-photo">
                      <Upload className="mr-2 h-4 w-4" />
                      Change Photo
                    </Button>
                  </CardContent>
                </Card>

                {/* Availability Status */}
                <Card>
                  <CardHeader>
                    <CardTitle>Availability Status</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <RadioGroup value={availabilityStatus} onValueChange={setAvailabilityStatus}>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="available" id="available" />
                        <label htmlFor="available" className="text-sm">Available for consultations</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="limited" id="limited" />
                        <label htmlFor="limited" className="text-sm">Limited availability</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="unavailable" id="unavailable" />
                        <label htmlFor="unavailable" className="text-sm">Currently unavailable</label>
                      </div>
                    </RadioGroup>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Expertise */}
          <TabsContent value="expertise">
            <div className="grid lg:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Expertise Domains</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4" data-testid="expertise-domains">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Primary Domains</label>
                      <div className="flex flex-wrap gap-2">
                        {expertDomains.map((domain, index) => (
                          <Badge 
                            key={index}
                            variant={domain.verified ? "default" : "secondary"}
                            className={domain.verified ? "bg-primary text-white" : "bg-accent text-white"}
                            data-testid={`domain-${domain.name.toLowerCase().replace(/\s+/g, '-')}`}
                          >
                            {domain.name}
                            {domain.verified && <CheckCircle className="ml-1 h-3 w-3" />}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Sub-domains</label>
                      <div className="flex flex-wrap gap-2">
                        {["Venture Capital", "M&A", "Financial Modeling", "Investment Analysis"].map((subdomain, index) => (
                          <Badge key={index} variant="outline" className="text-gray-600">
                            {subdomain}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <h4 className="font-medium text-gray-900 mb-3">Domain Verification Status</h4>
                    <div className="space-y-2">
                      {verificationStatuses.map((item, index) => (
                        <div key={index} className="flex justify-between items-center py-2">
                          <span className="text-sm text-gray-700">{item.domain}</span>
                          <Badge 
                            className={item.badge === "success" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}
                            data-testid={`verification-${item.domain.toLowerCase().replace(/\s+/g, '-')}`}
                          >
                            {item.status === "Verified" && <CheckCircle className="mr-1 h-3 w-3" />}
                            {item.status === "Pending" && <Clock className="mr-1 h-3 w-3" />}
                            {item.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Expert Statistics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="text-center p-6 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg">
                      <div className="flex items-center justify-center space-x-2 mb-2">
                        <Star className="h-6 w-6 text-yellow-500" />
                        <span className="text-3xl font-bold text-gray-900" data-testid="expert-rating">4.8</span>
                        <span className="text-gray-600">/5.0</span>
                      </div>
                      <p className="text-sm text-gray-600">Expert Rating</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center justify-center mb-2">
                          <BookOpen className="h-5 w-5 text-primary mr-2" />
                          <span className="text-2xl font-bold text-gray-900" data-testid="contributions-count">127</span>
                        </div>
                        <p className="text-sm text-gray-600">Contributions</p>
                      </div>

                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center justify-center mb-2">
                          <Users className="h-5 w-5 text-accent mr-2" />
                          <span className="text-2xl font-bold text-gray-900" data-testid="user-helps-count">2,840</span>
                        </div>
                        <p className="text-sm text-gray-600">User Helps</p>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-gray-200">
                      <h5 className="font-medium text-gray-900 mb-3">Recent Achievements</h5>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center">
                          <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                          <span>Top Contributor - December 2023</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                          <span>Expert Verified - Finance Domain</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></div>
                          <span>100 Q&A Pairs Milestone</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Notifications */}
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6" data-testid="notification-settings">
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="font-medium text-gray-900">Email Updates</label>
                      <p className="text-sm text-gray-600">Receive updates about your contributions and earnings</p>
                    </div>
                    <Switch 
                      checked={notifications.emailUpdates}
                      onCheckedChange={(checked) => handleNotificationChange('emailUpdates', checked)}
                      data-testid="switch-email-updates"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <label className="font-medium text-gray-900">WhatsApp Escalations</label>
                      <p className="text-sm text-gray-600">Get notified when expert consultation is needed</p>
                    </div>
                    <Switch 
                      checked={notifications.whatsappEscalations}
                      onCheckedChange={(checked) => handleNotificationChange('whatsappEscalations', checked)}
                      data-testid="switch-whatsapp"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <label className="font-medium text-gray-900">Monthly Summary</label>
                      <p className="text-sm text-gray-600">Monthly performance and earnings report</p>
                    </div>
                    <Switch 
                      checked={notifications.monthlySummary}
                      onCheckedChange={(checked) => handleNotificationChange('monthlySummary', checked)}
                      data-testid="switch-monthly-summary"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <label className="font-medium text-gray-900">Platform Announcements</label>
                      <p className="text-sm text-gray-600">Important updates and new features</p>
                    </div>
                    <Switch 
                      checked={notifications.platformAnnouncements}
                      onCheckedChange={(checked) => handleNotificationChange('platformAnnouncements', checked)}
                      data-testid="switch-announcements"
                    />
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-200">
                  <Button onClick={() => toast({ title: "Notification preferences saved!" })}>
                    Save Preferences
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Payments */}
          <TabsContent value="payments">
            <Card>
              <CardHeader>
                <CardTitle>Payment Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">Payment Method</label>
                    <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="bank" id="bank" />
                        <label htmlFor="bank" className="text-sm">Bank Transfer</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="paypal" id="paypal" />
                        <label htmlFor="paypal" className="text-sm">PayPal</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="upi" id="upi" />
                        <label htmlFor="upi" className="text-sm">UPI</label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {paymentMethod === 'bank' ? 'Account Number' : 
                       paymentMethod === 'paypal' ? 'PayPal Email' : 'UPI ID'}
                    </label>
                    <Input 
                      placeholder={
                        paymentMethod === 'bank' ? 'Enter account number' :
                        paymentMethod === 'paypal' ? 'Enter PayPal email' : 'Enter UPI ID'
                      }
                      defaultValue={
                        paymentMethod === 'bank' ? '****1234' :
                        paymentMethod === 'paypal' ? 'sarah@example.com' : 'sarah@paytm'
                      }
                      data-testid="input-payment-details"
                    />
                  </div>

                  <Button onClick={handlePaymentUpdate} data-testid="button-update-payment">
                    Update Payment Method
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security */}
          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900">Change Password</h4>
                        <p className="text-sm text-gray-600">Update your account password</p>
                      </div>
                      <Button 
                        variant="outline" 
                        onClick={() => handleSecurityAction('Password change')}
                        data-testid="button-change-password"
                      >
                        <Shield className="mr-2 h-4 w-4" />
                        Change Password
                      </Button>
                    </div>
                  </div>

                  <div className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900">Two-Factor Authentication</h4>
                        <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
                      </div>
                      <Button 
                        variant="outline"
                        onClick={() => handleSecurityAction('2FA setup')}
                        data-testid="button-enable-2fa"
                      >
                        <Shield className="mr-2 h-4 w-4" />
                        Enable 2FA
                      </Button>
                    </div>
                  </div>

                  <div className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900">Download Your Data</h4>
                        <p className="text-sm text-gray-600">Export all your account data and contributions</p>
                      </div>
                      <Button 
                        variant="outline"
                        onClick={() => handleSecurityAction('Data download')}
                        data-testid="button-download-data"
                      >
                        <Download className="mr-2 h-4 w-4" />
                        Download Data
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
