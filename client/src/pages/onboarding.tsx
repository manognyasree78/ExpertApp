import { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Badge } from "@/components/ui/badge";
import { GuidelinesModal } from "@/components/auth/guidelines-modal";
import { useAuth } from "@/lib/auth";
import { useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { onboardingSchema, type OnboardingData } from "@/lib/validation";
import { Brain, ArrowLeft, User, Briefcase, Clock, BookOpen, X, Plus } from "lucide-react";

const domains = [
  "Python", "Data Science", "Cloud", "Finance", "Product Management", 
  "Legal", "Compliance", "E-commerce", "Marketing", "HR", 
  "Cybersecurity", "DevOps", "Design/UX", "Other"
];

const countries = [
  "India", "United States", "United Kingdom", "Canada", 
  "Australia", "Germany", "Singapore", "United Arab Emirates"
];

const timezones = [
  { value: "PST", label: "PST - Pacific Standard Time" },
  { value: "EST", label: "EST - Eastern Standard Time" },
  { value: "BRT", label: "BRT - Brasília Time" },
  { value: "GMT", label: "GMT - Greenwich Mean Time" },
  { value: "CET", label: "CET - Central European Time" },
  { value: "EAT", label: "EAT - East Africa Time" },
  { value: "IST", label: "IST - India Standard Time" },
  { value: "WIB", label: "WIB - Western Indonesian Time" },
  { value: "SGT", label: "SGT - Singapore Time" },
  { value: "AEST", label: "AEST - Australian Eastern Standard Time" },
];

const experienceLevels = [
  "0-1 years", "2-3 years", "4-6 years", 
  "7-10 years", "11-15 years", "16+ years"
];

const qualifications = [
  "Bachelor's", "Master's", "MBA", "PhD", 
  "Professional Cert (CFA/PMP)", "Other"
];

const availabilityOptions = [
  { value: "part-time", label: "Part-time (≤10 hrs/week)", desc: "Limited availability for specific projects" },
  { value: "flexible", label: "Flexible (on-demand)", desc: "Available as needed for consultations" },
  { value: "full-time", label: "Full-time rapid response", desc: "High availability for immediate responses" },
];

export default function Onboarding() {
  const [guidelinesModalOpen, setGuidelinesModalOpen] = useState(false);
  const [subDomainInput, setSubDomainInput] = useState("");
  const [subDomains, setSubDomains] = useState<string[]>([]);
  const { auth, onboarding, setApprovalStatus } = useAuth();
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const form = useForm<OnboardingData>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      fullName: auth.user.name || "",
      email: auth.user.email || "",
      phone: "",
      country: "",
      timezone: "",
      domains: [],
      subDomains: [],
      experience: "",
      qualification: "",
      profileUrl: "",
      bio: "",
      availability: [],
      terms: false,
    },
  });

  // Redirect if not authenticated
  useEffect(() => {
    if (!auth.authed) {
      setLocation('/?auth=1');
    }
  }, [auth.authed, setLocation]);

  const addSubDomain = () => {
    if (subDomainInput.trim() && !subDomains.includes(subDomainInput.trim())) {
      const newSubDomains = [...subDomains, subDomainInput.trim()];
      setSubDomains(newSubDomains);
      form.setValue('subDomains', newSubDomains);
      setSubDomainInput("");
    }
  };

  const removeSubDomain = (domain: string) => {
    const newSubDomains = subDomains.filter(d => d !== domain);
    setSubDomains(newSubDomains);
    form.setValue('subDomains', newSubDomains);
  };

  const handleSubDomainKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addSubDomain();
    }
  };

  const onSubmit = (data: OnboardingData) => {
    if (!onboarding.guidelinesRead) {
      toast({
        title: "Guidelines Required",
        description: "Please read and acknowledge the Expert Program Guidelines.",
        variant: "destructive",
      });
      return;
    }

    setApprovalStatus(true);
    setLocation('/portal/dashboard');
    toast({
      title: "Application submitted successfully!",
      description: "Welcome to the expertApp expert network.",
    });
  };

  const isFormValid = () => {
    const formValues = form.watch();
    return (
      formValues.fullName && 
      formValues.email && 
      formValues.phone && 
      formValues.country && 
      formValues.timezone && 
      formValues.domains && formValues.domains.length > 0 && 
      formValues.experience && 
      formValues.qualification && 
      formValues.terms &&
      onboarding.guidelinesRead
    );
  };

  return (
    <div className="min-h-screen bg-bg-dark text-white" data-testid="onboarding-page">
      {/* Minimal Header */}
      <header className="bg-card-dark border-b border-border-dark shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Brain className="text-primary text-2xl mr-3" />
              <span className="text-xl font-bold text-white">Ottobon expertApp</span>
            </div>
            <Button 
              variant="ghost" 
              onClick={() => setLocation('/')}
              data-testid="back-to-home"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4" data-testid="onboarding-title">
            Join the expertApp Network: Your Journey Starts Here
          </h1>
          <p className="text-lg text-text-muted max-w-3xl mx-auto">
            Please provide your details below. This initial application helps us understand your expertise 
            and how you'd like to partner with expertApp.
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12" data-testid="onboarding-form">
            {/* Section 1: Personal & Contact */}
            <Card className="bg-card-dark border-border-dark">
              <CardHeader>
                <CardTitle className="flex items-center text-white">
                  <User className="text-primary mr-3" />
                  Personal & Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-text-muted">Full Name *</FormLabel>
                        <FormControl>
                          <Input className="bg-bg-light border-border-dark text-white" {...field} data-testid="input-fullname" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-text-muted">Email *</FormLabel>
                        <FormControl>
                          <Input type="email" className="bg-bg-light border-border-dark text-white" {...field} data-testid="input-email" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-text-muted">Phone *</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="+91 XXXXXXXXXX (include country code)" 
                            className="bg-bg-light border-border-dark text-white"
                            {...field} 
                            data-testid="input-phone"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="country"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-text-muted">Country *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-bg-light border-border-dark text-white" data-testid="select-country">
                              <SelectValue placeholder="Select Country" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {countries.map((country) => (
                              <SelectItem key={country} value={country}>
                                {country}
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
                    name="timezone"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel className="text-text-muted">Time Zone *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-bg-light border-border-dark text-white" data-testid="select-timezone">
                              <SelectValue placeholder="Select Time Zone" />
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
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Section 2: Professional Background */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Briefcase className="text-primary mr-3" />
                  Professional Background & Expertise
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <FormField
                  control={form.control}
                  name="domains"
                  render={() => (
                    <FormItem>
                      <FormLabel>Primary Domain(s) * (Select at least one)</FormLabel>
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                        {domains.map((domain) => (
                          <FormField
                            key={domain}
                            control={form.control}
                            name="domains"
                            render={({ field }) => {
                              return (
                                <FormItem
                                  key={domain}
                                  className="flex flex-row items-start space-x-3 space-y-0"
                                >
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(domain)}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([...field.value, domain])
                                          : field.onChange(
                                              field.value?.filter(
                                                (value) => value !== domain
                                              )
                                            )
                                      }}
                                      data-testid={`checkbox-domain-${domain.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                                    />
                                  </FormControl>
                                  <FormLabel className="text-sm font-normal">
                                    {domain}
                                  </FormLabel>
                                </FormItem>
                              )
                            }}
                          />
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Specific Sub-Domains / Niche Areas
                  </label>
                  <div className="flex flex-wrap gap-2 mb-2" data-testid="subdomain-tags">
                    {subDomains.map((domain) => (
                      <Badge key={domain} variant="secondary" className="flex items-center gap-1">
                        {domain}
                        <button
                          type="button"
                          onClick={() => removeSubDomain(domain)}
                          className="ml-1 hover:text-red-500"
                          data-testid={`remove-subdomain-${domain}`}
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      value={subDomainInput}
                      onChange={(e) => setSubDomainInput(e.target.value)}
                      onKeyDown={handleSubDomainKeyPress}
                      placeholder="Type and press Enter to add tags"
                      className="flex-1"
                      data-testid="input-subdomain"
                    />
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={addSubDomain}
                      data-testid="button-add-subdomain"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="experience"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Years of Experience *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger data-testid="select-experience">
                              <SelectValue placeholder="Select Experience" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {experienceLevels.map((level) => (
                              <SelectItem key={level} value={level}>
                                {level}
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
                    name="qualification"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Highest Qualification / Certifications *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger data-testid="select-qualification">
                              <SelectValue placeholder="Select Qualification" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {qualifications.map((qual) => (
                              <SelectItem key={qual} value={qual}>
                                {qual}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="profileUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Professional Profile URL (LinkedIn preferred)</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="https://linkedin.com/in/yourprofile" 
                          {...field} 
                          data-testid="input-profile-url"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="bio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Brief Professional Bio (~250 words)</FormLabel>
                      <FormControl>
                        <Textarea 
                          rows={4} 
                          placeholder="Describe your professional background, key achievements, and areas of expertise..." 
                          {...field} 
                          data-testid="textarea-bio"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* Section 3: Availability & Terms */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="text-primary mr-3" />
                  Availability & Terms
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <FormField
                  control={form.control}
                  name="availability"
                  render={() => (
                    <FormItem>
                      <FormLabel>Availability (Select all that apply)</FormLabel>
                      <div className="space-y-3">
                        {availabilityOptions.map((option) => (
                          <FormField
                            key={option.value}
                            control={form.control}
                            name="availability"
                            render={({ field }) => {
                              return (
                                <FormItem
                                  key={option.value}
                                  className="flex flex-row items-start space-x-3 space-y-0 p-3 border border-gray-300 rounded-lg"
                                >
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(option.value)}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([...(field.value || []), option.value])
                                          : field.onChange(
                                              field.value?.filter(
                                                (value) => value !== option.value
                                              )
                                            )
                                      }}
                                      data-testid={`checkbox-availability-${option.value}`}
                                    />
                                  </FormControl>
                                  <div>
                                    <FormLabel className="font-medium">
                                      {option.label}
                                    </FormLabel>
                                    <p className="text-sm text-gray-600">{option.desc}</p>
                                  </div>
                                </FormItem>
                              )
                            }}
                          />
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Expert Program Guidelines
                  </label>
                  {!onboarding.guidelinesRead ? (
                    <Button 
                      type="button"
                      variant="secondary"
                      onClick={() => setGuidelinesModalOpen(true)}
                      data-testid="button-read-guidelines"
                    >
                      <BookOpen className="mr-2 h-4 w-4" />
                      Read Expert Program Guidelines
                    </Button>
                  ) : (
                    <div className="p-3 bg-green-50 border border-green-200 rounded-lg" data-testid="guidelines-acknowledged">
                      <div className="flex items-center text-green-800">
                        <div className="flex-shrink-0">
                          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="ml-2 font-medium">Expert Program Guidelines Read</span>
                      </div>
                    </div>
                  )}
                </div>

                <FormField
                  control={form.control}
                  name="terms"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4 border border-gray-300 rounded-lg">
                      <FormControl>
                        <Checkbox 
                          checked={field.value} 
                          onCheckedChange={field.onChange}
                          data-testid="checkbox-terms"
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="font-medium text-gray-900">
                          I agree to the expertApp Terms & Conditions and Privacy Policy *
                        </FormLabel>
                        <p className="text-sm text-gray-600">
                          By checking this box, you acknowledge that you have read and agree to our terms of service and privacy policy.
                        </p>
                      </div>
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <div className="text-center">
              <Button 
                type="submit" 
                size="lg"
                disabled={!isFormValid()}
                className="px-8 py-4 text-lg font-semibold"
                data-testid="button-submit-application"
              >
                Submit Application
              </Button>
            </div>
          </form>
        </Form>
      </div>

      <GuidelinesModal 
        open={guidelinesModalOpen} 
        onOpenChange={setGuidelinesModalOpen} 
      />
    </div>
  );
}
