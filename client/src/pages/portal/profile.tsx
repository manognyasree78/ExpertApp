import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Camera, Plus, X, Shield, CreditCard, Bell, User } from "lucide-react";

const getInitials = (name: string) => {
  return name.split(' ').map(n => n[0]).join('').toUpperCase();
};

export default function Profile() {
  const { toast } = useToast();
  const [profileData, setProfileData] = useState({
    firstName: "Dr. Sarah",
    lastName: "Johnson",
    email: "sarah.johnson@example.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    company: "Digital Marketing Solutions",
    bio: "Experienced digital marketing strategist with over 10 years in the industry. Specialized in SEO, content marketing, and data-driven campaign optimization.",
    linkedin: "https://linkedin.com/in/sarahjohnson",
    website: "https://sarahjohnson.com"
  });

  const [expertiseDomains, setExpertiseDomains] = useState([
    "Digital Marketing", "SEO Strategy", "Business Analytics", "Financial Planning"
  ]);
  const [newDomain, setNewDomain] = useState("");

  const [notifications, setNotifications] = useState({
    emailUpdates: true,
    whatsappEscalations: false,
    monthlySummary: true
  });

  const [paymentMethod, setPaymentMethod] = useState("Bank Transfer");
  const [accountId, setAccountId] = useState("****1234");

  useEffect(() => {
    // Load data from localStorage
    const stored = localStorage.getItem('profile');
    if (stored) {
      const data = JSON.parse(stored);
      setProfileData(data.personal || profileData);
      setExpertiseDomains(data.expertise || expertiseDomains);
      setNotifications(data.notifications || notifications);
    }
  }, []);

  const saveProfile = () => {
    const data = {
      personal: profileData,
      expertise: expertiseDomains,
      notifications,
      payment: { method: paymentMethod, accountId }
    };
    localStorage.setItem('profile', JSON.stringify(data));
    toast({
      title: "Success",
      description: "Profile saved successfully"
    });
  };

  const addDomain = () => {
    if (newDomain && !expertiseDomains.includes(newDomain)) {
      setExpertiseDomains([...expertiseDomains, newDomain]);
      setNewDomain("");
    }
  };

  const removeDomain = (domain: string) => {
    setExpertiseDomains(expertiseDomains.filter(d => d !== domain));
  };

  const fullName = `${profileData.firstName} ${profileData.lastName}`;

  return (
    <div className="space-y-6 text-white" data-testid="profile-page">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Profile Settings</h1>
        <p className="text-text-muted">Manage your account and expertise information</p>
      </div>

      <Tabs defaultValue="personal" className="w-full">
        <TabsList className="grid w-full grid-cols-5 bg-card-dark border border-border-dark">
          <TabsTrigger value="personal" className="data-[state=active]:bg-primary data-[state=active]:text-white">Personal</TabsTrigger>
          <TabsTrigger value="expertise" className="data-[state=active]:bg-primary data-[state=active]:text-white">Expertise</TabsTrigger>
          <TabsTrigger value="notifications" className="data-[state=active]:bg-primary data-[state=active]:text-white">Notifications</TabsTrigger>
          <TabsTrigger value="payments" className="data-[state=active]:bg-primary data-[state=active]:text-white">Payments</TabsTrigger>
          <TabsTrigger value="security" className="data-[state=active]:bg-primary data-[state=active]:text-white">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="space-y-6">
          <Card className="bg-card-dark border-border-dark">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <User className="mr-2 h-5 w-5" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Avatar Section */}
              <div className="flex items-center space-x-6">
                <div className="relative">
                  <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center text-white text-xl font-bold">
                    {getInitials(fullName)}
                  </div>
                  <Button 
                    size="sm" 
                    className="absolute -bottom-2 -right-2 rounded-full h-8 w-8 p-0"
                    onClick={() => toast({ title: "Photo Upload", description: "Photo upload feature coming soon" })}
                  >
                    <Camera className="h-4 w-4" />
                  </Button>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white">{fullName}</h3>
                  <p className="text-text-muted">Expert Contributor</p>
                </div>
              </div>

              {/* Form Fields */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label className="text-text-muted">First Name</Label>
                  <Input
                    value={profileData.firstName}
                    onChange={(e) => setProfileData({...profileData, firstName: e.target.value})}
                    className="bg-gray-800 border-gray-600 text-white"
                  />
                </div>
                <div>
                  <Label className="text-text-muted">Last Name</Label>
                  <Input
                    value={profileData.lastName}
                    onChange={(e) => setProfileData({...profileData, lastName: e.target.value})}
                    className="bg-gray-800 border-gray-600 text-white"
                  />
                </div>
                <div>
                  <Label className="text-text-muted">Email</Label>
                  <Input
                    value={profileData.email}
                    onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                    className="bg-gray-800 border-gray-600 text-white"
                  />
                </div>
                <div>
                  <Label className="text-text-muted">Phone Number</Label>
                  <Input
                    value={profileData.phone}
                    onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                    className="bg-gray-800 border-gray-600 text-white"
                  />
                </div>
                <div>
                  <Label className="text-text-muted">Location</Label>
                  <Input
                    value={profileData.location}
                    onChange={(e) => setProfileData({...profileData, location: e.target.value})}
                    className="bg-gray-800 border-gray-600 text-white"
                  />
                </div>
                <div>
                  <Label className="text-text-muted">Company</Label>
                  <Input
                    value={profileData.company}
                    onChange={(e) => setProfileData({...profileData, company: e.target.value})}
                    className="bg-gray-800 border-gray-600 text-white"
                  />
                </div>
              </div>

              <div>
                <Label className="text-text-muted">Professional Bio</Label>
                <Textarea
                  value={profileData.bio}
                  onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                  rows={4}
                  className="bg-gray-800 border-gray-600 text-white resize-none"
                />
                <p className="text-text-muted text-sm mt-1">{profileData.bio.length}/500</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label className="text-text-muted">LinkedIn Profile</Label>
                  <Input
                    value={profileData.linkedin}
                    onChange={(e) => setProfileData({...profileData, linkedin: e.target.value})}
                    className="bg-gray-800 border-gray-600 text-white"
                  />
                </div>
                <div>
                  <Label className="text-text-muted">Personal Website</Label>
                  <Input
                    value={profileData.website}
                    onChange={(e) => setProfileData({...profileData, website: e.target.value})}
                    className="bg-gray-800 border-gray-600 text-white"
                  />
                </div>
              </div>

              <Button onClick={saveProfile} className="bg-primary hover:bg-primary-hover">
                Save Changes
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="expertise" className="space-y-6">
          <Card className="bg-card-dark border-border-dark">
            <CardHeader>
              <CardTitle className="text-white">Current Expertise Domains</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2 mb-4">
                {expertiseDomains.map((domain) => (
                  <Badge key={domain} className="bg-primary/20 text-primary border-primary border flex items-center gap-1">
                    {domain}
                    <button 
                      onClick={() => removeDomain(domain)}
                      className="ml-1 hover:text-red-400"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  value={newDomain}
                  onChange={(e) => setNewDomain(e.target.value)}
                  placeholder="Add new domain..."
                  className="bg-gray-800 border-gray-600 text-white"
                  onKeyPress={(e) => e.key === 'Enter' && addDomain()}
                />
                <Button onClick={addDomain} variant="outline" className="border-border-dark">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card-dark border-border-dark">
            <CardHeader>
              <CardTitle className="text-white">Domain Verification Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { domain: "Digital Marketing", status: "Verified" },
                { domain: "SEO Strategy", status: "Verified" },
                { domain: "Business Analytics", status: "Pending" }
              ].map((item) => (
                <div key={item.domain} className="flex items-center justify-between">
                  <span className="text-white">{item.domain}</span>
                  <Badge className={item.status === "Verified" ? 
                    "bg-green-900/20 text-green-400 border-green-700 border" : 
                    "bg-yellow-900/20 text-yellow-400 border-yellow-700 border"
                  }>
                    {item.status}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-3 gap-4">
            <Card className="bg-card-dark border-border-dark">
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-primary">4.8/5.0</div>
                <div className="text-text-muted">Expert Rating</div>
              </CardContent>
            </Card>
            <Card className="bg-card-dark border-border-dark">
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-accent">127</div>
                <div className="text-text-muted">Contributions</div>
              </CardContent>
            </Card>
            <Card className="bg-card-dark border-border-dark">
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-yellow-400">2,840</div>
                <div className="text-text-muted">User Helps</div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card className="bg-card-dark border-border-dark">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Bell className="mr-2 h-5 w-5" />
                Notification Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {[
                { key: 'emailUpdates', label: 'Email Updates', desc: 'Receive email notifications for important updates' },
                { key: 'whatsappEscalations', label: 'WhatsApp Escalations', desc: 'Get WhatsApp messages for urgent escalations' },
                { key: 'monthlySummary', label: 'Monthly Summary', desc: 'Monthly performance and earnings summary' }
              ].map((item) => (
                <div key={item.key} className="flex items-center justify-between">
                  <div>
                    <div className="text-white font-medium">{item.label}</div>
                    <div className="text-text-muted text-sm">{item.desc}</div>
                  </div>
                  <Switch
                    checked={notifications[item.key as keyof typeof notifications]}
                    onCheckedChange={(checked) => setNotifications({...notifications, [item.key]: checked})}
                  />
                </div>
              ))}
              <Button onClick={saveProfile} className="bg-primary hover:bg-primary-hover">
                Save Preferences
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payments" className="space-y-6">
          <Card className="bg-card-dark border-border-dark">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <CreditCard className="mr-2 h-5 w-5" />
                Payment Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-text-muted">Payment Method</Label>
                <Input
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="bg-gray-800 border-gray-600 text-white"
                />
              </div>
              <div>
                <Label className="text-text-muted">Account ID</Label>
                <Input
                  value={accountId}
                  onChange={(e) => setAccountId(e.target.value)}
                  className="bg-gray-800 border-gray-600 text-white"
                />
              </div>
              <Button onClick={saveProfile} className="bg-primary hover:bg-primary-hover">
                Save Payment Info
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card className="bg-card-dark border-border-dark">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Shield className="mr-2 h-5 w-5" />
                Security Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { label: 'Change Password', desc: 'Update your account password' },
                { label: 'Enable 2-Factor Auth', desc: 'Add an extra layer of security' },
                { label: 'Download Data', desc: 'Export your account data' }
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between p-4 border border-border-dark rounded-lg">
                  <div>
                    <div className="text-white font-medium">{item.label}</div>
                    <div className="text-text-muted text-sm">{item.desc}</div>
                  </div>
                  <Button 
                    variant="outline" 
                    className="border-border-dark"
                    onClick={() => toast({ title: item.label, description: `${item.label} feature coming soon` })}
                  >
                    Configure
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}